import { Component, OnInit } from '@angular/core';
import {
  VC_INSTRUCTION_TITLE, VC_INSTRUCTION_ITEM_1_1, VC_INSTRUCTION_ITEM_1_2,
  VC_INSTRUCTION_ITEM_1_3, VC_INSTRUCTION_ITEM_2_1, VC_INSTRUCTION_ITEM_2_2, VC_INSTRUCTION_ITEM_3,
  VC_INSTRUCTION_ITEM_4_1_1, VC_INSTRUCTION_ITEM_4_1_2, VC_INSTRUCTION_ITEM_4_2_1, VC_INSTRUCTION_ITEM_4_2_2,
  VC_INSTRUCTION_ITEM_4_3_1, VC_INSTRUCTION_ITEM_4_3_2, VC_INSTRUCTION_ITEM_4_TITLE,
  VC_INSTRUCTION_ITEM_4_4_1, VC_INSTRUCTION_ITEM_4_4_2, VC_INSTRUCTION_ITEM_4_4_3, VC_INSTRUCTION_ITEM_4_4_4
} from './value-compatibility-instruction';

@Component({
  selector: 'app-value-compatibility-test-inctruction',
  templateUrl: './value-compatibility-test-inctruction.component.html',
  styleUrls: ['./value-compatibility-test-inctruction.component.scss']
})
export class ValueCompatibilityTestInctructionComponent implements OnInit {

    vc_instruction_title = `${VC_INSTRUCTION_TITLE}`;
    vc_instruction_item_1_1 = `${VC_INSTRUCTION_ITEM_1_1}`;
    vc_instruction_item_1_2 =  `${VC_INSTRUCTION_ITEM_1_2}`;
    vc_instruction_item_1_3 =  `${VC_INSTRUCTION_ITEM_1_3}`;
    vc_instruction_item_2_1 =  `${VC_INSTRUCTION_ITEM_2_1}`;
    vc_instruction_item_2_2 =  `${VC_INSTRUCTION_ITEM_2_2}`;
    vc_instruction_item_3 =  `${VC_INSTRUCTION_ITEM_3}`;
    vc_instruction_item_4_title = `${VC_INSTRUCTION_ITEM_4_TITLE}`;
    vc_instruction_item_4_1_1  = `${VC_INSTRUCTION_ITEM_4_1_1}`;
    vc_instruction_item_4_1_2  = `${VC_INSTRUCTION_ITEM_4_1_2}`;
    vc_instruction_item_4_2_1  = `${VC_INSTRUCTION_ITEM_4_2_1}`;
    vc_instruction_item_4_2_2  = `${VC_INSTRUCTION_ITEM_4_2_2}`;
    vc_instruction_item_4_3_1  = `${VC_INSTRUCTION_ITEM_4_3_1}`;
    vc_instruction_item_4_3_2  = `${VC_INSTRUCTION_ITEM_4_3_2}`;
    vc_instruction_item_4_4_1  = `${VC_INSTRUCTION_ITEM_4_4_1}`;
    vc_instruction_item_4_4_2  = `${VC_INSTRUCTION_ITEM_4_4_2}`;
    vc_instruction_item_4_4_3  = `${VC_INSTRUCTION_ITEM_4_4_3}`;
    vc_instruction_item_4_4_4  = `${VC_INSTRUCTION_ITEM_4_4_4}`;

  constructor() { }

  ngOnInit() {
  }

}
