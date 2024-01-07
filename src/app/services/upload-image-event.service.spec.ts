import { TestBed, inject } from '@angular/core/testing';

import { UploadImageEventService } from './upload-image-event.service';

describe('UploadImageEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadImageEventService]
    });
  });

  it('should be created', inject([UploadImageEventService], (service: UploadImageEventService) => {
    expect(service).toBeTruthy();
  }));
});
