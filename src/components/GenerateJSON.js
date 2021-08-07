import React from 'react'
import axios from 'axios'

const GenerateJSON = (props) => {
    
    const linkStructure = 'https://api.coronavirus.data.gov.uk/v1/data?' +
    `filters=areaType=nation;areaName=${props.nation}&` +
    'structure={"date":"date","newCases":"newCasesByPublishDate", "newDeaths":"newDeaths28DaysByPublishDate"}'

    let jsonData
    axios.get(linkStructure).then(res => {
        jsonData = res.data.data
    })
    .catch(err => {
        console.log(err)
    })

    return 'hello'
}

export default GenerateJSON
