/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Yolov5Service } from './yolov5.service';

describe('Service: Yolov5', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Yolov5Service]
    });
  });

  it('should ...', inject([Yolov5Service], (service: Yolov5Service) => {
    expect(service).toBeTruthy();
  }));
});
