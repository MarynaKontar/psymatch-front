import { Component, OnInit } from '@angular/core';
import {
  ABOUT_EPIGRAPH1, ABOUT_EPIGRAPH2, ABOUT_EPIGRAPH3, ABOUT_EPIGRAPH_SIGNATURE, ABOUT_HEADER,
  PSYCHOLOGICAL_COMPATIBILITY_CAN_BE_MEASURED_DESCRIPTION, PSYCHOLOGICAL_COMPATIBILITY_CAN_BE_MEASURED_FOOTER,
  PSYCHOLOGICAL_COMPATIBILITY_CAN_BE_MEASURED_HEADER,
  PSYCHOLOGICAL_COMPATIBILITY_CAN_BE_MEASURED_LIST11, PSYCHOLOGICAL_COMPATIBILITY_CAN_BE_MEASURED_LIST12,
  PSYCHOLOGICAL_COMPATIBILITY_CAN_BE_MEASURED_LIST21, PSYCHOLOGICAL_COMPATIBILITY_CAN_BE_MEASURED_LIST22,
  PSYCHOLOGICAL_COMPATIBILITY_CAN_BE_MEASURED_LIST31, PSYCHOLOGICAL_COMPATIBILITY_CAN_BE_MEASURED_LIST32,
  PSYCHOLOGICAL_COMPATIBILITY_CAN_BE_MEASURED_LIST41, PSYCHOLOGICAL_COMPATIBILITY_CAN_BE_MEASURED_LIST42,
  PSYCHOLOGICAL_COMPATIBILITY_HEADER, PSYCHOLOGICAL_COMPATIBILITY_DESCRIPTION,
  PSYCHOLOGICAL_COMPATIBILITY_LIST1, PSYCHOLOGICAL_COMPATIBILITY_LIST2,
  PSYCHOLOGICAL_COMPATIBILITY_LIST3, PSYCHOLOGICAL_COMPATIBILITY_LIST4, PSYCHOLOGICAL_COMPATIBILITY_FOOTER,
  PSYCHOLOGICAL_INCOMPATIBILITY_HEADER,
  PSYCHOLOGICAL_INCOMPATIBILITY_DESCRIPTION

} from './about-project';

@Component({
  selector: 'app-psychological-compatibility-info',
  templateUrl: './psychological-compatibility-info.component.html',
  styleUrls: ['./psychological-compatibility-info.component.scss']
})
export class PsychologicalCompatibilityInfoComponent implements OnInit {
  about_header = `${ABOUT_HEADER}`;
  about_epigraph1 = `${ABOUT_EPIGRAPH1}`;
  about_epigraph2 = `${ABOUT_EPIGRAPH2}`;
  about_epigraph3 = `${ABOUT_EPIGRAPH3}`;
  about_epigraph_signature = `${ABOUT_EPIGRAPH_SIGNATURE}`;

  psychological_incompatibility_header = `${PSYCHOLOGICAL_INCOMPATIBILITY_HEADER}`;
  psychological_incompatibility_description = `${PSYCHOLOGICAL_INCOMPATIBILITY_DESCRIPTION}`;

  psychological_compatibility_header = `${PSYCHOLOGICAL_COMPATIBILITY_HEADER}`;
  psychological_compatibility_description = `${PSYCHOLOGICAL_COMPATIBILITY_DESCRIPTION}`;
  psychological_compatibility_list1 = `${PSYCHOLOGICAL_COMPATIBILITY_LIST1}`;
  psychological_compatibility_list2 = `${PSYCHOLOGICAL_COMPATIBILITY_LIST2}`;
  psychological_compatibility_list3 = `${PSYCHOLOGICAL_COMPATIBILITY_LIST3}`;
  psychological_compatibility_list4 = `${PSYCHOLOGICAL_COMPATIBILITY_LIST4}`;
  psychological_compatibility_footer = `${PSYCHOLOGICAL_COMPATIBILITY_FOOTER}`;

  psychological_compatibility_can_be_measured_header = `${PSYCHOLOGICAL_COMPATIBILITY_CAN_BE_MEASURED_HEADER}`;
  psychological_compatibility_can_be_measured_description = `${PSYCHOLOGICAL_COMPATIBILITY_CAN_BE_MEASURED_DESCRIPTION}`;
  psychological_compatibility_can_be_measured_list11 = `${PSYCHOLOGICAL_COMPATIBILITY_CAN_BE_MEASURED_LIST11}`;
  psychological_compatibility_can_be_measured_list12 = `${PSYCHOLOGICAL_COMPATIBILITY_CAN_BE_MEASURED_LIST12}`;
  psychological_compatibility_can_be_measured_list21 = `${PSYCHOLOGICAL_COMPATIBILITY_CAN_BE_MEASURED_LIST21}`;
  psychological_compatibility_can_be_measured_list22 = `${PSYCHOLOGICAL_COMPATIBILITY_CAN_BE_MEASURED_LIST22}`;
  psychological_compatibility_can_be_measured_list31 = `${PSYCHOLOGICAL_COMPATIBILITY_CAN_BE_MEASURED_LIST31}`;
  psychological_compatibility_can_be_measured_list32 = `${PSYCHOLOGICAL_COMPATIBILITY_CAN_BE_MEASURED_LIST32}`;
  psychological_compatibility_can_be_measured_list41 = `${PSYCHOLOGICAL_COMPATIBILITY_CAN_BE_MEASURED_LIST41}`;
  psychological_compatibility_can_be_measured_list42 = `${PSYCHOLOGICAL_COMPATIBILITY_CAN_BE_MEASURED_LIST42}`;
  psychological_compatibility_can_be_measured_footer = `${PSYCHOLOGICAL_COMPATIBILITY_CAN_BE_MEASURED_FOOTER}`;

  constructor() { }

  ngOnInit() {
  }

}
