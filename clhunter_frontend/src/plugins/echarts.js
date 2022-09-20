import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  MarkLineComponent
} from 'echarts/components';
import { ScatterChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { VisualMapComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  MarkLineComponent,
  ScatterChart,
  CanvasRenderer,
  UniversalTransition,
  VisualMapComponent,
  LineChart
]);


export default echarts;