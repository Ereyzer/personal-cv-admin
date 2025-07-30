// import { myDebounce } from '../../utils/debounce';

import { apiService } from '../../config';

// const changeMargins = myDebounce(function changeMargins(startChanger) {
//   startChanger();
// }, 300);

export class PhotoMovementHandlerClass {
  #topStart;
  #leftStart;

  #topMax;
  #bottomMax;
  #leftMax;
  #rightMax;
  #prevX;
  #prevY;
  #updateImageStyle;
  #photoX;
  #photoY;
  #tmpPhotoY;
  #tmpPhotoX;
  #photo;
  #circleDiameter;
  #windowWidth;
  #canvas;
  constructor(x, y, updateImageStyle, photoRef, canvas, windowWidth = 400, circleDiameter = 200) {
    this.#photoX = x;
    this.#photoY = y;
    this.#updateImageStyle = updateImageStyle;
    this.#photo = photoRef;

    this.#windowWidth = windowWidth;
    this.#circleDiameter = circleDiameter;
    this.#canvas = canvas;
  }

  getPrevX = () => this.#prevX;
  getPrevY = () => this.#prevY;
  setPrevX = x => {
    this.#prevX = x;
  };
  setPrevY = y => {
    this.#prevY = y;
  };
  setPhotoY = y => {
    if (y !== undefined) {
      this.#photoY = 0;
      this.#tmpPhotoY = 0;
    } else {
      this.#photoY = y || this.#tmpPhotoY || this.#photoY;
    }
  };
  setPhotoX = x => {
    if (x !== undefined) {
      this.#photoX = 0;
      this.#tmpPhotoX = 0;
    } else {
      this.#photoX = this.#tmpPhotoX || this.#photoX;
    }
  };
  setTopLefrStart = () => {
    this.#topStart = Number.parseInt((this.#windowWidth - this.#photo.current.clientHeight) / 2);
    this.#leftStart = Number.parseInt((this.#windowWidth - this.#photo.current.clientWidth) / 2);

    this.#topMax = 99 - this.#topStart;
    this.#bottomMax =
      101 - this.#topStart - (this.#photo.current.offsetHeight - this.#circleDiameter);
    this.#leftMax = 99 - this.#leftStart;
    this.#rightMax =
      101 - this.#leftStart - (this.#photo.current.offsetWidth - this.#circleDiameter);
  };

  #topChange = changeY => {
    let top = this.#photoY + changeY;

    if (top > this.#topMax) {
      top = this.#topMax;
    }
    if (top < this.#bottomMax) {
      top = this.#bottomMax;
    }
    return top;
  };

  #leftChange = changeX => {
    let left = this.#photoX + changeX;
    if (left > this.#leftMax) {
      left = this.#leftMax;
    }
    if (left < this.#rightMax) {
      left = this.#rightMax;
    }
    return left;
  };

  movementEvent = e => {
    const { clientX, clientY } = e;
    const changeY = clientY - this.#prevY;
    const changeX = clientX - this.#prevX;

    const top = changeY === 0 ? 0 : this.#topChange(changeY);

    const left = changeX === 0 ? 0 : this.#leftChange(changeX);

    this.#updateImageStyle({ top, left });
    this.#tmpPhotoY = top;
    this.#tmpPhotoX = left;
  };

  scaleEven = setSliderValue => {
    this.setTopLefrStart();

    return e => {
      const sliderValue = parseInt(e.target.value);

      const styleObj = { width: sliderValue };
      const margynLeft = (this.#windowWidth - sliderValue) / 2;
      if (this.#photoX + margynLeft > 99) {
        this.#photoX = 99 - margynLeft;
      }
      const nextRightMax = 101 - margynLeft - (sliderValue - this.#circleDiameter);
      if (this.#photoX < nextRightMax) {
        this.#photoX = nextRightMax;
      }
      const sideCorrelation = Number.parseFloat(
        this.#photo.current.naturalHeight / this.#photo.current.naturalWidth
      );

      const nextHeight = Number.parseFloat(sliderValue * sideCorrelation);

      const margynTop = (this.#windowWidth - nextHeight) / 2;
      if (this.#photoY + margynTop > 99) {
        this.#photoY = 99 - margynTop;
      }
      const nextBottomMax = 101 - margynTop - (nextHeight - this.#circleDiameter);
      if (this.#photoY < nextBottomMax) {
        this.#photoY = nextBottomMax;
      }
      styleObj.left = this.#photoX;
      styleObj.top = this.#photoY;

      this.#updateImageStyle(styleObj);
      setSliderValue(sliderValue);
      this.setTopLefrStart();
    };
  };

  cropPhoto = async () => {
    const ctx = this.#canvas.current.getContext('2d');

    const widthCorrelation = this.#photo.current.naturalWidth / this.#photo.current.width;
    const heightCorrelation = this.#photo.current.naturalHeight / this.#photo.current.height;
    const cropWidth = widthCorrelation * 200;
    const cropHeight = heightCorrelation * 200;
    this.#canvas.current.width = this.#circleDiameter;
    this.#canvas.current.height = this.#circleDiameter;
    const cropX = (99 - this.#leftStart - this.#photoX) * widthCorrelation;
    const cropY = (99 - this.#topStart - this.#photoY) * heightCorrelation;
    ctx.drawImage(
      this.#photo.current,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      this.#circleDiameter,
      this.#circleDiameter
    );
    const blobPromise = new Promise((resolve, reject) => {
      this.#canvas.current.toBlob(blob => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create Blob from canvas.'));
        }
      }, 'image/jpg');
    });

    return await apiService.updateCutAvatar(await blobPromise);
  };
}
