import { TestBed } from '@angular/core/testing';
import { CameraService } from './camera.service';
describe('CameraService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(CameraService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=camera.service.spec.js.map