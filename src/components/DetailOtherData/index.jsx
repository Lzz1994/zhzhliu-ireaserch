import React, { Component } from 'react'
import {Row,Col,Popover,Tag,Input,Tooltip,Icon,Modal,Button} from 'antd'
import './index.less'
import ReactHighcharts from 'react-highcharts'
import  Highcharts  from 'highcharts'
import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import axios from 'axios'
import {Link} from "react-router-dom"
import { observer, inject } from 'mobx-react'


@inject('listStore') @observer
class DetailOtherData extends Component {
  constructor(props){
    super(props)
    this.state={
      tags: ['一直播', '虎牙tv', '斗鱼tv'],
      inputVisible: false,
      inputValue: '',
      selectedSearch:0,
      show:false,
      returnList:[],
      // ifOnBlur:true
      config:{},
    }
  }

  //取图标数据
  componentDidMount() {
    const {listStore} = this.props;
    let daStore1 = [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640,
      1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
      27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
      26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
      24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
      22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
      10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104]
    let daStore2 = [
      null, null, null, null, null, null, null, null, null, null,
               5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
               4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
               15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049,
               33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000,
               35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
               21000, 20000, 19000, 18000, 18000, 17000, 16000
    ]

    let dataStore1 = []
    let dataStore2 = []

    var self = this;
    //console.log(paramsTags)
    axios.get('https://data.jianshukeji.com/jsonp?filename=json/aapl-c.json&callback=?')
    .then(function(data){
      let dataStr = data.data.substring(1)
      const res = eval('(' + dataStr + ')')
      // dataStore1 = res
    })
    .then(function(){
      axios.get('https://data.jianshukeji.com/jsonp?filename=json/aapl-c.json&callback=?')
      .then(function(data2) {
        let dataStr2 = data2.data.substring(1)
        const res2 = eval('(' + dataStr2 + ')')
        // dataStore2 = res2

        for(var i=0; i<67; i++) {
          var test = [];
          test.push(res2[i][0])
          test.push(daStore1[i])
          dataStore1.push(test)
          test = []
        }

        for(var i=0; i<67; i++) {
          var test2 = [];
          test2.push(res2[i][0])
          test2.push(daStore2[i])
          dataStore2.push(test2)
          test2 = []
        }


        const config = {
          rangeSelector: {
            enabled:false
          },
          navigator:{
            enabled:false
          },
          credits:{
            enabled:false
          },
          exporting:{
            enabled:false
          },
          scrollbar: {
            enabled:false,
          },
          title: {
            text: 'USD to EUR exchange rate'
          },
          yAxis: {
            labels: {
              align: 'right',
              formatter: function () {
                return this.value / 1000 + 'k';
              }
            },
              title: {
                  text: 'Exchange rate'
              },
              
          },
          xAxis: {
            labels: {
              align:"left"
            },
            allowDecimals: false
          },
         
          series: [{
            name : 'AAPL Stock Price',
            data : dataStore1,
            id: 'dataseries',
            type : 'area',
            threshold : null,
            tooltip : {
                valueDecimals : 2
            },
            fillColor : {
                linearGradient : {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops : [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            }
          },{
            name : 'test',
            data : dataStore2,
            id: 'dataseries2',
            type : 'area',
            threshold : null,
            tooltip : {
                valueDecimals : 2
            },
            fillColor : {
                linearGradient : {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops : [
                    [0, Highcharts.getOptions().colors[1]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            }
          },{
            type: 'flags',
              data: [{
                  x: Date.UTC(2006, 7, 12),
                  title: 'A',
                  text: 'Shape: "squarepin"'
              }, {
                  x: Date.UTC(2006, 5, 25),
                  title: 'A',
                  text: 'Shape: "squarepin"'
              }],
              onSeries: 'dataseries',
              shape: 'squarepin',
              width: 16
          }]
        }
        self.setState({
          config: config
        })
      })
    })
    .catch(function(error){
      console.log(error)
    })
  }

  //取更新数据
  componentDidUpdate() {
    //console.log(this.state.returnList.slice())
    //this.setState({ifOnBlur:true})
  }

  //标签操作
  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
  }
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  //input显示输入 &  筛选搜索列表 
  handleInputChange = (event, searchList) => {
    const returnListData = [];
    const searchListArr = searchList.split(",");
    this.setState({ 
      inputValue: event.target.value,    
    },()=> {
      searchListArr.map((item,index)=>{
           if(item.indexOf(this.state.inputValue) == 0) {
             returnListData.push(item);            
           }
         })
      this.setState({
        returnList : returnListData,
        show : this.state.inputValue == "" ? false : true
      })            
    });   
  }
  saveInputRef = input => this.input = input;

  //点击搜索类别
  handleLi(index) {
    this.setState({
      selectedSearch:index
    })
  }
  //点击确定
  handleClickConfirm() {
    const selectedTags = this.state.tags
  }

  //点击link传入标签
  handleLink() {
    const tags  = this.state.tags
    const {listStore} = this.props
    listStore.openTags = tags
  }

  //点击搜索提示词自动填入
  handleClickList(e,item) {
    let tags = this.state.tags
    if (item && tags.indexOf(item) === -1) {
      tags = [...tags, item];
    }
    //console.log(tags);
    this.setState({
      tags,
      inputVisible: false,         
      inputValue: '',
      show:false,
      // ifOnBlur:false
    });
  }


  render() {
    //搜索引擎类型
    const {listStore} = this.props;
    const searchType = listStore.searchType.slice();     
    //console.log(searchType)
    const dataSource = [
      {
        id:1, 
        data:searchType[0].cn,
        dataEn:searchType[0].en
      },
      {
        id:2,
        data:searchType[1].cn,
        dataEn:searchType[1].en
      },
      {
        id:3,
        data:searchType[2].cn,
        dataEn:searchType[2].en
      },
      {
        id:4,
        data:searchType[3].cn,
        dataEn:searchType[3].en
      },
      {
        id:5,
        data:searchType[4].cn,
        dataEn:searchType[4].en
      }
    ]
    const data = dataSource.map((item,index)=>{
      return(
        <li 
          className="iresearch-detail-other-source-content" 
          key={index} 
          onClick={this.handleLi.bind(this,index)}
          style={{backgroundColor:index == this.state.selectedSearch ? "#E6EFFF" : "#FFFFFF"}}
        >
          {listStore.detailLang == 'zh_CN'?item.data:item.dataEn}
        </li>
      )
    })
    //左侧标签
    const { tags, inputVisible, inputValue } = this.state;
    //图标数据(从接口获取)
    const graphData = [
      
    ]
    // `${listStore.searchType.slice()[this.state.selectedSearch]}搜索指数趋势`
    //左侧图表
/*     const config = {
      chart:{
        type:'line',

     },
     title: {
         text: `${listStore.detailLang == 'zh_CN'?`${listStore.searchType.slice()[this.state.selectedSearch].cn}搜索指数趋势`:`${listStore.searchType.slice()[this.state.selectedSearch].en} Search index trend`}`,
         align: 'left'
     },
     credits:{
      enabled:false
     },
     subtitle: {
         text: '',
         align: 'left'
     },
     yAxis: {
         title: {
             text: 'Number of Employees'
         }
     },
     legend: {
         layout: 'horizontal',
         align: 'left',
         verticalAlign: 'top'
     },
     plotOptions: {
         series: {
             label: {
                 connectorAllowed: false
             },
             pointStart: 2010
         }
     },
     series: [
      {
        name: listStore.detailLang == 'zh_CN'?'一直播':'Live broadcast',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }, {
        name: listStore.detailLang == 'zh_CN'?'虎牙':'Huya',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
        name: listStore.detailLang == 'zh_CN'?'斗鱼':'Douyu',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    }, {
        name: 'Project Development',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    }, {
        name: 'Other',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
    }
     ],
     responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
      }
    } */

    //右侧研究报告列表
    const messageData = [
      {
        id:1,
        message:'陌陌就用户iCloud遭入侵一事发声明：将一同进…,陌陌就用户iCloud遭入侵一事发声明：将一同进…,陌陌就用户iCloud遭入侵一事发声明：将一同进… ',
        date:'2018/03/08'
      },
      {
        id:2,
        message:'陌陌就用户iCloud遭入侵一事发声明：将一同进123333',
        date:'2018/03/08'
      }
    ]
    const messageList = messageData.map((item,index)=>{
      return(
        <div className="detail-other-right-messageItem" key={item.id}>
            <div className="messageItem-text">{item.message}</div>
            <div className="messageItem-update">{item.date}更新</div>
        </div>
      )
    })
    //搜索列表
    const searchListData = [111,222,1144,333];
    return(
    <div className="detail-other">
        <Row gutter={20}>
          <Col span={15}>
            <div className="iresearch-detail-other-left">
              <div className="iresearch-detail-other-title">{listStore.detailLang == 'zh_CN'?'另类数据':'Alternative data'}</div>
              <div className="iresearch-detail-other-update">
                <span>2018-03-01</span>
                <span>{listStore.detailLang == 'zh_CN'?'更新':'update'}</span>
                <div onClick={this.handleLink.bind(this)}> 
                    <Link 
                      className="iresearch-detail-other-unfold"
                      to={{pathname: '/details/otherData'}}
                    >
                     <span className="iresearch-detail-other-unfold-text">{listStore.detailLang == 'zh_CN'?'展开':'Open'}</span>
                     <i className="iconfont icon-bottom"></i>
                    </Link>
                </div>  
                
              </div>
              <div className='iresearch-detail-other-source'>
                <ul>{data}</ul>
              </div>
              <div className="iresearch-detail-other-tag">
                <div className='iresearch-detail-other-tag-one'>{listStore.detailLang == 'zh_CN'?'按关键词':'By key words'}</div>
                {
                  tags.map((tag, index) => {
                  const isLongTag = tag.length > 20;
                  const tagElem = (
                    <Tag 
                      key={tag} 
                      closable={index >= 0} 
                      afterClose={() => this.handleClose(tag)}
                      >
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                      </Tag>
                    );
                    return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                  })
                }
                {
                  inputVisible && (
                    <div className="iresearch-detail-other-search">
                      <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={this.state.inputValue}
                        onChange={(e) =>{this.handleInputChange(e,searchListData.join(","))}}
                        // onBlur={this.state.ifOnBlur ? ()=>{this.handleInputConfirm} : ()=>{}}
                        // onBlur={()=>{timer = setTimeout(this.handleInputConfirm),1200}}
                        // onPressEnter={this.handleInputConfirm}
                      />
                      
                      <div className="iresearch-detail-other-searchList" style={{display:this.state.show ? 'block' : 'none'}}>
                        <ul>
                          {
                            this.state.returnList.map((item,index)=>{
                              return(
                                <li
                                  key={index} 
                                  onClick={(e)=>{this.handleClickList(e,item)}}
                                  className="iresearch-detail-other-searchList-li"
                                >
                                  <div>
                                    <span style={{color:"#D11C22"}}>
                                      {item.substr(0,this.state.inputValue.length)}
                                    </span>
                                      <span>
                                      {item.substring(this.state.inputValue.length)}
                                    </span> 
                                  </div>
                                </li>
                              )
                            })
                          }
                        </ul>
                      </div>
                    </div>
                  )
                }
                {
                  !inputVisible && (
                  <Tag
                    onClick={this.showInput}
                    style={{ background: '#fff', borderStyle: 'dashed' }}
                  >
                    <Icon type="plus" /> {listStore.detailLang == 'zh_CN'?'添加对比词':'Add to'}
                  </Tag>
                  )
                }
              </div>
              <div className="iresearch-detail-other-tag-confirm" onClick={this.handleClickConfirm.bind(this)}>{listStore.detailLang == 'zh_CN'?'确定':'confirm'}</div>
              <div className="iresearch-detail-other-chartContainer" ref="myHChart">
                <ReactHighstock config={this.state.config}></ReactHighstock>
              </div>
            </div>
          </Col>
          <Col span={9}>
            <div className="iresearch-detail-other-right">
              <div className="detail-other-right-title">
                <div className="other-right-title-line"></div>
                <div className="other-right-title-text">{listStore.detailLang == 'zh_CN'?'公司消息':'Company news'}</div>
              </div>
              <div className="detail-other-right-messageList">
                  {messageList }
              </div>
            </div>
          </Col>
        </Row>
      </div>
      )
   }
}
export default DetailOtherData