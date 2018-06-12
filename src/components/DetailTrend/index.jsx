import React, { Component } from 'react'
import { Row, Col, Button, Popover, Radio } from 'antd'
import './index.less'
import DetailChart from './../DetailChart'
import { observer, inject } from 'mobx-react'
import ReactHighcharts from 'react-highcharts'
import Highcharts from 'highcharts'
import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import axios from 'axios'
@inject('listStore')
@observer
class DetailTrend extends Component {
  constructor(props) {
    super(props)
    this.state = {
      maskStatus: false,
      radioStatus: false,
      color: "#FFFF",
      sizeChecked: 0,
      imgChecked: 0,
      legendStatus: true,
      titleStatus: true,
      colorChoice: true,
      config: {},
      installconfig: {},
      liIndex: 0
    }
  }

  componentDidMount() {
    var self = this;
    var time = (new Date()).getTime().toString();
    axios.get(' https://data.jianshukeji.com/stock/history/000001?time=' + time)
      .then((res) => {
        let result = res.data.data;
        let ohlc = new Array();
        let volume = new Array();
        result.forEach((item, i) => {
          const items = item;
          const date = items[0];
          // 用于显示k线图的数据
          ohlc.push([
            date,      // 转换时间为时间戳格式
            +items[1], // 开盘价
            +items[3], // 最高价
            +items[4], // 最低价
            +items[2], // 收盘价
          ]);
          // 用于显示成交量的数据
          volume.push({
            x: date,     // 时间
            y: +items[5] + 100, // 成交量数据
            color: (+items[2]) - (+items[1]) > 0 ? 'green' : 'red'
          });
        });
        var config = {
          credits: {
            //隐藏版权
            enabled: false
          },
          scrollbar: {
            //隐藏滚动条
            enabled: false
          },
          navigator: {
            //隐藏导航器
            enabled: false
          },
          exporting: {
            //隐藏导出按钮
            enabled: false
          },
          rangeSelector: {
            // 隐藏时间范围选择器
            enabled: false
            // selected: 0,
            // 设置右上角的日期格式  
            // inputDateFormat: '%Y-%m-%d'
          },
          title: {
            text: '平安银行历史股价'
          },
          legend: {
            //显示图例
            enabled: true
          },
          tooltip: {
            split: false,
            shared: true,
            formatter: function () {
              if (self.props.listStore.detailLang == 'zh_CN') {
                var s = Highcharts.dateFormat('<span> %Y-%m-%d %H:%M:%S</span>', this.x);
                for (let i = 0; i < this.points.length; i++) {
                  if (this.points[i].series.userOptions.type == "candlestick") {
                    s += '<br /><b>' + this.points[i].series.name + '<b/><br />开盘:<b>'
                      + this.points[i].point.open
                      + '</b><br />最高:<b>'
                      + this.points[i].point.high
                      + '</b><br />最低:<b>'
                      + this.points[i].point.low
                      + '</b><br />收盘:<b>'
                      + this.points[i].point.close
                      + '</b><br />';
                  } else {
                    s += '<br />' + this.points[i].series.name + ':<b>' + this.points[i].y.toFixed(2) + '<b/><br/>'
                  }
                }
                return s;
              } else {
                var s = Highcharts.dateFormat('<span> %Y-%m-%d %H:%M:%S</span>', this.x);
                for (let i = 0; i < this.points.length; i++) {
                  if (this.points[i].series.userOptions.type == "candlestick") {
                    s += '<br /><b>' + this.points[i].series.name + '<b/><br />open:<b>'
                      + this.points[i].point.open
                      + '</b><br />high:<b>'
                      + this.points[i].point.high
                      + '</b><br />low:<b>'
                      + this.points[i].point.low
                      + '</b><br />close:<b>'
                      + this.points[i].point.close
                      + '</b><br />';
                  } else {
                    s += '<br />' + this.points[i].series.name + ':<b>' + this.points[i].y.toFixed(2) + '<b/><br/>'
                  }
                }
                return s;
              }
            }
          },
          xAxis: {
            dateTimeLabelFormats: {
              millisecond: '%H:%M:%S.%L',
              second: '%H:%M:%S',
              minute: '%H:%M',
              hour: '%H:%M',
              day: '%m-%d',
              week: '%m-%d',
              month: '%y-%m',
              year: '%Y'
            },
            type: "category",
            categories: [2010, 2011, 2012, 2013, 2014, 2015]
          },
          yAxis: [
            {
              labels: {
                align: 'left',
                x: -3
              },
              title: {
                text: '股价走势'
              },
              height: '50%',
              lineWidth: 1,
              opposite: false
            },
            {
              labels: {
                align: 'left',
                x: -3
              },
              title: {
                text: '成交量'
              },
              top: '55%',
              height: '40%',
              offset: 0,
              lineWidth: 1,
              opposite: false
            }],
          series: [{
            type: 'candlestick',
            name: 'AAPL',
            color: 'green',
            lineColor: 'green',
            upColor: 'red',
            upLineColor: 'red',
            data: ohlc,
            showInLegend: false,
            yAxis: 0,
          },
          {
            type: 'column',
            name: 'Volume-export',
            data: volume,
            showInLegend: false,
            yAxis: 1
          },
          {
            type: 'line',
            name: 'Line-export',
            data: volume,
            yAxis: 1
          }
          ]
        }
        self.setState({
          config: config
        });

      })
    var _time = (new Date()).getTime().toString();
    axios.get(' https://data.jianshukeji.com/stock/history/000001?time=' + _time)
      .then((res) => {
        let result = res.data.data;
        let ohlc = new Array();
        let volume = new Array();
        result.forEach((item, i) => {
          const items = item;
          const date = items[0];
          // 用于显示k线图的数据
          ohlc.push([
            date,      // 转换时间为时间戳格式
            +items[1], // 开盘价
            +items[3], // 最高价
            +items[4], // 最低价
            +items[2], // 收盘价
          ]);
          // 用于显示成交量的数据
          volume.push({
            x: date,     // 时间
            y: +items[5], // 成交量数据
            color: (+items[2]) - (+items[1]) > 0 ? 'green' : 'red'
          });
        });
        var installconfig = {
          credits: {
            //隐藏版权
            enabled: false
          },
          scrollbar: {
            //隐藏滚动条
            enabled: false
          },
          navigator: {
            //隐藏导航器
            enabled: false
          },
          exporting: {
            //隐藏导出按钮
            enabled: false
          },
          rangeSelector: {
            // 隐藏时间范围选择器
            enabled: false
            // selected: 0,
            // 设置右上角的日期格式  
            // inputDateFormat: '%Y-%m-%d'
          },
          title: {
            text: '平安银行历史股价'
          },
          legend: {
            //显示图例
            enabled: true
          },
          tooltip: {
            split: false,
            shared: true,
            formatter: function () {
              if (self.props.listStore.detailLang == 'zh_CN') {
                var s = Highcharts.dateFormat('<span> %Y-%m-%d %H:%M:%S</span>', this.x);
                for (let i = 0; i < this.points.length; i++) {
                  if (this.points[i].series.userOptions.type == "candlestick") {
                    s += '<br /><b>' + this.points[i].series.name + '<b/><br />开盘:<b>'
                      + this.points[i].point.open
                      + '</b><br />最高:<b>'
                      + this.points[i].point.high
                      + '</b><br />最低:<b>'
                      + this.points[i].point.low
                      + '</b><br />收盘:<b>'
                      + this.points[i].point.close
                      + '</b><br />';
                  } else {
                    s += '<br />' + this.points[i].series.name + ':<b>' + this.points[i].y.toFixed(2) + '<b/><br/>'
                  }
                }
                return s;
              } else {
                var s = Highcharts.dateFormat('<span> %Y-%m-%d %H:%M:%S</span>', this.x);
                for (let i = 0; i < this.points.length; i++) {
                  if (this.points[i].series.userOptions.type == "candlestick") {
                    s += '<br /><b>' + this.points[i].series.name + '<b/><br />open:<b>'
                      + this.points[i].point.open
                      + '</b><br />high:<b>'
                      + this.points[i].point.high
                      + '</b><br />low:<b>'
                      + this.points[i].point.low
                      + '</b><br />close:<b>'
                      + this.points[i].point.close
                      + '</b><br />';
                  } else {
                    s += '<br />' + this.points[i].series.name + ':<b>' + this.points[i].y.toFixed(2) + '<b/><br/>'
                  }
                }
                return s;
              }
            }
          },
          xAxis: {
            dateTimeLabelFormats: {
              millisecond: '%H:%M:%S.%L',
              second: '%H:%M:%S',
              minute: '%H:%M',
              hour: '%H:%M',
              day: '%m-%d',
              week: '%m-%d',
              month: '%y-%m',
              year: '%Y'
            },
            type: "category",
            categories: [2010, 2011, 2012, 2013, 2014, 2015]
          },
          yAxis: [
            {
              labels: {
                align: 'left',
                x: -3
              },
              title: {
                text: '股价走势'
              },
              height: '50%',
              lineWidth: 1,
              opposite: false
            },
            {
              labels: {
                align: 'left',
                x: -3
              },
              title: {
                text: '成交量'
              },
              top: '55%',
              height: '40%',
              offset: 0,
              lineWidth: 1,
              opposite: false
            }],
          series: [{
            type: 'candlestick',
            name: 'AAPL',
            color: 'green',
            lineColor: 'green',
            upColor: 'red',
            upLineColor: 'red',
            data: ohlc,
            showInLegend: false,
            yAxis: 0
          },
          {
            type: 'column',
            name: 'Volume-modal',
            data: volume,
            showInLegend: false,
            yAxis: 1
          },
          {
            type: 'line',
            name: 'Line-modal',
            data: volume,
            yAxis: 1
          }
          ]
        }
        self.setState({
          installconfig: installconfig
        });

      })
  }

  changeLi = (index) => {
    //console.log(index);
    this.setState({
      liIndex: index
    })
  }
  render() {
    const { listStore } = this.props;
    const dataTime = [
      {
        id: 1,
        data: '分时',
        dataEn: 'Time'
      }, {
        id: 2,
        data: '5分钟',
        dataEn: '5 Minutes'
      }, {
        id: 3,
        data: '30分钟',
        dataEn: '30 Minutes'
      }, {
        id: 4,
        data: '日K',
        dataEn: 'Day'
      }, {
        id: 5,
        data: '月K',
        dataEn: 'Month'
      },
    ];
    const tabdata = dataTime.map((item, index) => {
      return (
        <li
          key={item.id}
          onClick={(iondex) => { this.changeLi(index) }}
          className='iresearch-detail-trend-time-content-click'
          style={{ backgroundColor: index === this.state.liIndex ? "#E6EFFF" : "#FFFFFF" }}
        >
          {listStore.detailLang === 'zh_CN' ? item.data : item.dataEn}
        </li>
      )
    })

    //右侧研究报告列表
    const reportData = [
      {
        id: 1,
        reportName: "15年中国互联网生活直播市场研究报告.pdf",
        date: '2018/03/08'
      },
      {
        id: 2,
        reportName: "15年中国互联网生活直播市场研究报告.pdf",
        date: '2018/03/08'
      },

      {
        id: 3,
        reportName: "15年中国互联网生活直播市场研究报告.pdf",
        date: '2018/03/08'
      }, {
        id: 4,
        reportName: "15年中国互联网生活直播市场研究报告.pdf",
        date: '2018/03/08'
      },
      {
        id: 5,
        reportName: "15年中国互联网生活直播市场研究报告.pdf",
        date: '2018/03/08'
      },
      {
        id: 6,
        reportName: "15年中国互联网生活直播市场研究报告.pdf",
        date: '2018/03/08',
        url: 'www.baidu.com'
      }
    ]
    const reportList = reportData.map((item, index) => {
      return (
        index < 4 ?
          <div className='trend-right-content-list' key={index}>
            <div className='trend-right-content-info'>
              <div className='right-content-top'>
                <i className="iconfont icon-wenjian" style={{ color: "#91CCF1" }}></i>
                {item.reportName}
              </div>
              <div className='right-content-bottom'>
                <img className='right-content-bottom-logo' src={require('../../images/logo1.png')} alt=''></img>
                <span className='right-content-bottom-time'>{item.date}更新</span>
              </div>
            </div>
            <div className='trend-right-content-upload'>
              <Button className="download-btn">
                <a href={item.url} download={item.reportName} target="_blank">下载</a>
              </Button>
            </div>
          </div>
          :
          <div className='trend-right-content-list' key={index}>
            <div className='trend-right-content-info'>
              <div className='right-content-top'>
                <i className="iconfont icon-wenjian" style={{ color: "#91CCF1" }}></i>
                <span>{item.reportName}</span>
              </div>
              <div className='right-content-bottom'>
                <span className='right-content-bottom-span-time'>{item.date}更新</span>
              </div>
            </div>
            <div className='trend-right-content-upload'>
              <Button className="download-btn" >
                <a href={item.url} download={item.reportName} >下载</a>
              </Button>
            </div>
          </div>
      )
    })

    return (
      <div className="detail-trend">
        <Row gutter={20}>
          <Col span={15}>
            <div
              className="iresearch-detail-trend-left">
              {/* <div className="iresearch-detail-trend-title" dangerouslySetInnerHTML={{__html: 'First &middot; Second'}}></div> */}
              <div className="iresearch-detail-trend-title">{listStore.detailLang === 'zh_CN' ? '行情走势' : 'Market trend'}</div>
              <div className="iresearch-detail-trend-update">
                <DetailChart config={this.state.config} installconfig={this.state.installconfig} {...this.props} className="trend-detail-chart" />
              </div>
              <div className="iresearch-detail-trend-time"><ul>{tabdata}</ul></div>
            </div>
          </Col>
          <Col span={9}>
            <div className="iresearch-detail-trend-right">
              <div className="detail-trend-right-title">
                <div className="trend-right-title-line"></div>
                <div className="trend-right-title-text">{listStore.detailLang === 'zh_CN' ? '研究报告' : 'Research report'}</div>
              </div>
              <div className='detail-trend-right-content'>
                {reportList}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
export default DetailTrend