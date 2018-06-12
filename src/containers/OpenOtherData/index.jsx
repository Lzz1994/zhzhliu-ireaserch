import React, { Component } from 'react'
import ReactDOM from "react-dom"
import './index.less'
import Header from '../../components/Header'
import {Menu} from 'antd'
import { observer, inject } from 'mobx-react'
import OtherDataGraph from '../../components/OtherDataGraph'

@inject('listStore') @observer

class OtherData extends Component{
  constructor(props){
    super(props)
    this.state ={
      
    }
  }
  componentDidMount(){
    const {listStore} = this.props
    //console.log(listStore.openTags)

    this.node.scrollIntoView();
  }

  render(){
    const {listStore} = this.props
    const searchTypeArr = listStore.searchType.slice()
    console.log(searchTypeArr.length)
    return <div className="ireaserch-home" ref={node => this.node = node}>
        <div className="iresearch-home-header">
          <Header {...this.props} />
        </div>

        <div className="iresearch-home-content">
          <div className="iresearch-home-content-container">
                  <div className="iresearch-home-detail-otherdata" >
                      {
                        searchTypeArr.map((item,index)=>{
                          return(
                            <div className="iresearch-home-graph-otherdata-graph" key={index}>
                              <OtherDataGraph searchType={item}/>
                            </div>
                          )
                        })
                      }
                   </div>
          
           </div>
        </div>
      </div>
  }
}
export default OtherData