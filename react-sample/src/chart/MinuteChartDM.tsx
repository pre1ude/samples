import React, { useEffect, useRef } from 'react'
import { init, dispose, ChartApi, CandleType, LineType, YAxisPosition, YAxisType, LayoutChildType, PanePosition } from '@dm/klinecharts'
// import generatedDataList from '../generatedDataList'
import Layout from '../Layout'
// import data0 from '../generatedData'
import { data as data0 } from '../data/futures/data0'
import { data as data1 } from '../data/futures/data1'
import { data as data1_1 } from '../data/futures/data1_1'
import { data as data2 } from '../data/futures/data2'
import { data as data2_1 } from '../data/futures/data2_1'
import { data as data3 } from '../data/futures/data3'

/* const types = [
  { key: 'candle_solid', text: '蜡烛实心' },
  { key: 'candle_stroke', text: '蜡烛空心' },
  { key: 'candle_up_stroke', text: '蜡烛涨空心' },
  { key: 'candle_down_stroke', text: '蜡烛跌空心' },
  { key: 'ohlc', text: 'OHLC' },
  { key: 'area', text: '面积图' }
] */

const timeShareTicks = generateTimeTicks()

export default function ChartType () {
  const chartRef = useRef<ChartApi | null>()

  useEffect(() => { 
    const chart = init('real-time-k-line_DM', {
      layout: [
        { 
          type: "candle" as LayoutChildType,
          content: [
            { name: "WA_PRICE" }
            // { name: "MA" }
          ],
          options: {
            axisOptions: {
              scrollZoomEnabled: false,
              YAxis: {
                [YAxisPosition.Left]: {
                  type: YAxisType.Normal
                },
                [YAxisPosition.Right]: {
                  type: YAxisType.MinutePercentage,
                }
              }
            }
          }
        },
        {
          type: "indicator" as LayoutChildType,
          content: [
            // { name: "AO" },
            { name: "VOL_SIMPLE", yAxisPosition: "left", shouldFormatBigNumber: false },
            { name: "OPEN_INTEREST", yAxisPosition: "right", shouldFormatBigNumber: false },
            // { name: "MA", shouldOhlc: true, yAxisPosition: "right" },
          ],
          options: {
            gap: {
              top: 0.2,
              bottom: 0
            },
            axisOptions: {
              scrollZoomEnabled: false,
              YAxis: {
                [YAxisPosition.Left]: {
                  type: YAxisType.Normal
                },
                [YAxisPosition.Right]: {
                  type: YAxisType.Normal,
                }
              }
            }
          }
        },
        {
          type: 'xAxis' as LayoutChildType,
          options: {
            position: "bottom" as PanePosition,
            axisOptions: {
              scrollZoomEnabled: false
            }
          }
        }
      ],
      styles: { 
        grid: { horizontal: { style: LineType.Dashed } },
        candle: {
          type: CandleType.Area,
          area: {
            point: {
              show: false
            },
            lineSize: 1,
            lineOnly: true,
            // backgroundColor: 'rgba(22, 119, 255, 0)'
          }
        },
        indicator: {
          bars: [
            // {
            //   noChangeColor: "#474E59",
            //   upColor: "#E6380C",
            //   downColor: "#009113",
            // },
            {
              noChangeColor: "#E5EFFF",
              upColor: "#FE5500",
              downColor: "#34C734",
            }
          ]
        },
        yAxis: { 
          position: YAxisPosition.Both,
        }
      },
      isTimeShare: true,
      timeShareTicks,
      staticXaxis: true,
      preferXTicks: ["9:30", "10:00", "11:00", "11:30", "13:30", "14:30", "15:00", "15:15"],
    })
    // 设置最右边贴边
    // chart?.setOffsetRightDistance(10000)
    // chart?.setBarSpace(1)
    // 设置禁止滚动 缩放
    chart?.setScrollEnabled(!1)
    chart?.setZoomEnabled(!1)

    const _data = prepareData(data0)
    // const minOpenInterest = Math.min(...data1.map(e => e.openInterest))
    // const maxOpenInterest = Math.max(...data1.map(e => e.openInterest))
    // console.log('[wxli]:', minOpenInterest, maxOpenInterest)
    // window.setTimeout(() => {
      chart?.applyNewData(_data)
    // }, 1000);
    
    // chart?.applyNewData(generatedDataList())
    chartRef.current = chart

    return () => {
      dispose('real-time-k-line')
    }
  }, [])

  return (
    <Layout
      title="分时图DM">
      <div id="real-time-k-line_DM" className="k-line-chart"/>
      <div
        className="k-line-chart-menu-container">
        {/* {
          types.map(({ key, text }) => {
            return (
              <button
                key={key}
                onClick={_ => {
                  chart.current && chart.current.setStyles({
                    candle: {
                      type: key as CandleType
                    }
                  })
                }}>
                {text}
              </button>
            )
          })
        } */}
      </div>
    </Layout>
  )
}

function prepareData (data: any) {
  return data.map(({ lastPrice, waPrice, diffLastPrice, preSettlementPrice, strippedIssueTime, openInterest, totalCurVolume }: any) => ({
    timestamp: new Date(+strippedIssueTime),
    open: lastPrice,
    high: lastPrice,
    low: lastPrice,
    close: lastPrice,
    volume: totalCurVolume,
    prevClose: preSettlementPrice,
    waPrice,
    openInterest,
    diffLastPrice,
  }))
}

function generateTimeTicks () {
  const result = [];

  for (let minute = 30; minute < 60; minute++) {
    result.push(`09:${minute < 10 ? `0${minute}` : minute}`);
  }

  for (let minute = 0; minute < 60; minute++) {
    result.push(`10:${minute < 10 ? `0${minute}` : minute}`);
  }

  for (let minute = 0; minute <= 30; minute++) {
    result.push(`11:${minute < 10 ? `0${minute}` : minute}`);
  }

  for (let minute = 0; minute < 60; minute++) {
    result.push(`13:${minute < 10 ? `0${minute}` : minute}`);
  }

  for (let minute = 0; minute < 60; minute++) {
    result.push(`14:${minute < 10 ? `0${minute}` : minute}`);
  }

  for (let minute = 0; minute <= 15; minute++) {
    result.push(`15:${minute < 10 ? `0${minute}` : minute}`);
  }

  return result;
};