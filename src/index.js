import './scss/index.scss'
import {Excel} from "./сomponents/excel/Excel";
import {Toolbar} from "./сomponents/toolbar/Toolbar";
import {Formula} from "./сomponents/formula/Formula";
import {Table} from "./сomponents/table/Table";
import {Header} from "./сomponents/header/Header";

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table]
})

excel.render()