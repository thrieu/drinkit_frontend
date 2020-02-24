import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../services/product';
import {ContentsService} from '../../services/contents.service';

@Component({
  selector: 'app-stock-indicator',
  templateUrl: './stock-indicator.component.html',
  styleUrls: ['./stock-indicator.component.less']
})
export class StockIndicatorComponent implements OnInit {
  @Input() drink: Product;

  constructor(
    public contentsService: ContentsService
  ) { }

  ngOnInit(): void {
  }

  getStock(): number|null {
    if (!this.drink) {
      return null;
    }
    return this.contentsService.getContentDocument(this.drink)?.stock;
  }
}
