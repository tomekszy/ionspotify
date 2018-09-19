import { Component } from '@angular/core';

import { ScanPage } from '../scan/scan';
import { SearchPage } from '../search/search';
import { AddPage } from '../add/add';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ScanPage;
  tab2Root = SearchPage;
  tab3Root = AddPage;

  constructor() {

  }
}
