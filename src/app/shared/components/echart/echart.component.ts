import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-echart',
  templateUrl: './echart.component.html',
  styleUrls: ['./echart.component.scss']
})
export class EchartComponent implements OnInit {
  @Input() data: any;
  @Input() type: string;
  @Input() width: string;
  @Input() chartTitle: string;
  configuration: EChartsOption;
  @Input('colorPalette') colorPalette?: string[] = ['#ed7d31', '#92d050', '#5b9bd5', '#ff0000', '#a6a6a6', '#f2ec36'];
  pieChartColorPalette: string[] = ['#a6a6a6', '#ff0000', '#5b9bd5', '#ed7d31', '#92d050', '#f2ec36']
  chartOption: EChartsOption ;
  constructor(
  ) { }
  ngOnInit(){
    this.setChartType()
  }
  setChartType() {
    switch (this.type) {
      case 'pie':
        this.chartOption = {
          title: {
            text:'report-Image',
            show: false
          },
          label: {
            formatter: ' {b}   {c}',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            // bottom: 0
            //  paddingTop: 30,
            top:'15%'
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {
                show: true,
                title: ''
              },
              mark: { show: false },
              dataView: { show: false, readOnly: false },
              restore: { show: false },
            }
          },
          series: [
            {
              color: this.colorPalette,
              name: 'pie chart',
              width: 'auto',
              height: 'auto',
              type: 'pie',
              radius: [90, 150],
              center: ['50%', '50%'],
              roseType: 'area',
              itemStyle: {
                borderRadius: 8
              },
              data: this.data.map(item => {
                return {
                  value: item.count,
                  name: item.name,
                }
              })
            }
          ]
        };
        break;

      default:
        break;
    }
  }

}
