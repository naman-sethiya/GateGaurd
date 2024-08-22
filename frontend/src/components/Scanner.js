import React, { useEffect } from 'react';
import Quagga from 'quagga';
import {useDispatch} from 'react-redux';
import { setScannerResult, closeScanner } from '../slices/scannerSlice';

const BarcodeScanner = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: document.querySelector('#barcode-scanner'),
        constraints: {
          width: 600,
          height: 450,
        },
      },
      decoder: {
        readers: [],
      },
    }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      Quagga.start();
    });

    Quagga.onDetected((data) => {
      console.log('Barcode detected:', data.codeResult.code);
      dispatch(setScannerResult(data.codeResult.code));
      dispatch(closeScanner());
      Quagga.stop();
    });

    return () => {
      Quagga.stop();
    };
  }, []);

  return (
    <div id="barcode-scanner" className="h-[200px] w-[270px] m-4 p-2 border-2 border-green-500">
      {/* The video stream and detected barcode will be displayed here */}
    </div>
  );
};

export default BarcodeScanner;