import React, { Component } from 'react'
import DivProgress from './DivProgress'

import { socketData } from '../service/address/utils'
import { address } from '../service/address/address'

import gql from 'graphql-tag'

export default class DataPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      temperature: [0, 0, 0, 0]
    }
    this.token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMTg3MzIzMjUwNjQiLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsInVzZXIiXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLXVzZXItaWQiOiI0MGJhZGQwZC04Nzg5LTRkM2YtYTAxZS1jOTllZWVmMmM0ZGMifSwiaWF0IjoxNTg4ODQzODQ1LCJleHAiOjE1OTE0MzU4NDUsInN1YiI6IjQwYmFkZDBkLTg3ODktNGQzZi1hMDFlLWM5OWVlZWYyYzRkYyJ9.T6aWY1_FyVuFeufkHM71Ze44tNKRWoX37ph-BlofMTQnRBSflqmzxa0j1n9-gMJCWAFqnla9ZVA-ovrocwYXap5j5_LpVRzKcFsEN6ak-kPuVCdU6riMpx8VCZ66rY9HFDsuCNfoO1jK9adlNZjLOTUFP0raeq29AbVpzzlANJQLiWI4cRBHtwSkg7b31KeS35Ieo6-nG2sZmGJXeP5GkSYkvSTMJ3nDZx7J9-s-ezwfFvKWl0dSweK2TWfMfaqt8mHzejMls3xrfI1eCLyO7olIe2jhYXtQerxIFm812yF7huWXK6VBOdHbXNDDfVySXuC-NQ9pTtkwuMbHNpeHIA'
    this.token1 = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMTg3MzIzMjUwNjQiLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsInVzZXIiXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLXVzZXItaWQiOiI0MGJhZGQwZC04Nzg5LTRkM2YtYTAxZS1jOTllZWVmMmM0ZGMifSwiaWF0IjoxNTg4OTEwOTQ1LCJleHAiOjE1ODg5MTA5NzUsInN1YiI6IjQwYmFkZDBkLTg3ODktNGQzZi1hMDFlLWM5OWVlZWYyYzRkYyJ9.K3BlwJAcmVRr3zVGz0HrIjGx2F8cp8R9hDPRrzEQbDQ5F8zKV_RUdt5B4bxSyq3paNy3hIF2rzzIG3cKtbjig3brHT1SCre97fJSCww7cVTtPusdAAuXkwX3veqm39vtBng-fw7_9Vycc-8h5K3plOQRCSJhK9FX3XAe6SBn4Dbb4dR_bbOx3dGw2AhRuOxB5f3F9rog8U05FneVanCxX0WH0aQDYiDlGOh7Mkc0Nw7CgMkE2tkqBM9eZDa7B2PvFI8FjBFkmxrFOJ2o3x9K0irahzhTvn2m9F7iiEda0ESUV03Gs9b5aH262EVedELPGP4Lq8zAey4ciEUh5Xfbcg'
  }

  // getTemp = () => {
  //   let body = {
  //     "query": `
  //     query{
  //       survey(where: {wt_id: {_eq: 2}},order_by: {id: asc}) {
  //         env_temp
  //         carbin_temp
  //         gear_box_temp
  //         axis_temp
  //       }
  //    }
  //     `,
  //     "variables": null
  //   }
  //   let config = {
  //     url: address.serviceDomain,
  //     body: JSON.stringify(body),
  //     token: this.token
  //   }
  //   request(config)
  //     .then((response) => {
  //       if (response.errors) {
  //         if (response.errors[0].extensions.code === "invalid-jwt") {
  //         } else {
  //           console.log('出错了')
  //         }
  //       } else {
  //         if (response.data.survey.length) {
  //           console.log(response.data.survey, 'sssssssssssssssss')
  //           let survey = response.data.survey[0]
  //           let temperature = [0, 0, 0, 0]

  //           temperature[0] = survey.env_temp
  //           temperature[1] = survey.carbin_temp
  //           temperature[2] = survey.gear_box_temp
  //           temperature[3] = survey.axis_temp

  //           this.setState({
  //             temperature: temperature,

  //           })
  //         }
  //       }
  //     }).catch((error) => {
  //       console.log('ERROR', error)
  //     })
  // }

  componentDidMount() {
    let SUBSCRIBE_QUERY = gql`
    subscription {
      survey(where: {wt_id: {_eq: 2}},order_by: {id: asc}) {
        id
        env_temp
        carbin_temp
        gear_box_temp
        axis_temp
      }
    }
    `;
    let wsUrl = 'ws://111.231.221.197:10004/v1/graphql'
    socketData(wsUrl, SUBSCRIBE_QUERY, this.token).then((response) => {
      if (response==='token过期') {
        console.log('请执行token过期相关的操作')
      } else {
        if (response.data.survey.length) {
          console.log(response.data.survey, 'sssssssssssssssss')
          let survey = response.data.survey[0]
          let temperature = [0, 0, 0, 0]

          temperature[0] = survey.env_temp
          temperature[1] = survey.carbin_temp
          temperature[2] = survey.gear_box_temp
          temperature[3] = survey.axis_temp

          this.setState({
            temperature: temperature,
          })
        }
      }
    })
  }

  render() {
    return (
      <div style={{
        width: window.innerWidth,
        height: window.innerHeight,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#001527',
      }}>
        {/* 温度 */}
        <div className='overviewleft2' style={{
          width: 280,
        }}>
          {
            ['环境温度', '机舱温度', '齿轮箱温度', '主轴承温度'].map((value, key) => {
              return (
                <div
                  key={key}
                  style={{
                    width: 280,
                    height: 21,
                    marginTop: 20,
                    fontSize: 14,
                  }}>
                  <DivProgress
                    title={value}
                    titleColor='rgba(242, 242, 242, 1)'
                    value={this.state.temperature[key]}
                    unit={'℃'}
                    maxValue={30}
                  />
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
