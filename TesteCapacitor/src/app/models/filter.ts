import { Marvin, MarvinImage } from 'marvin';

export abstract class Filter {
  name: string;
  constructor(name: string) { this.name = name; }
  abstract applyFilter(img1: MarvinImage, img2: MarvinImage): MarvinImage;
}

export class GrayScaleFilter extends Filter {
  applyFilter(img1: MarvinImage, img2: MarvinImage){
    Marvin.grayScale(img1, img2);
    return img2;
  }
}

export class BlackAndWhiteFilter extends Filter {
  level: number;

  constructor(name: string, level: number) {
    super(name);
    this.level = level;
  }

  applyFilter(img1: MarvinImage, img2: MarvinImage){
    Marvin.blackAndWhite(img1, img2, this.level);
    return img2;
  }
}

export class SepiaFilter extends Filter {
  intensity: number;

  constructor(name: string, intensity: number) {
    super(name);
    this.intensity = intensity;
  }

  applyFilter(img1: MarvinImage, img2: MarvinImage){
    img2.clear(0xFF000000);
    Marvin.sepia(img1, img2, this.intensity);
    return img2;
  }
}

export class EmbossFilter extends Filter {
  applyFilter(img1: MarvinImage, img2: MarvinImage){
    Marvin.emboss(img1, img2);
    return img2;
  }
}

export class EdgeDetectionFilter extends Filter {
  applyFilter(img1: MarvinImage, img2: MarvinImage){
    img2.clear(0xFF000000);
    Marvin.prewitt(img1, img2);
    return img2;
  }
}

export class ResetFilter extends Filter {
  applyFilter(img1: MarvinImage, img2: MarvinImage){
    return img1;
  }
}
