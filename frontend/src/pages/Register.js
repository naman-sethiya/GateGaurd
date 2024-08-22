import React, { useEffect, useState } from "react";
import { FaBackward } from "react-icons/fa";
import BarcodeScanner from "../components/Scanner";
import { useSelector, useDispatch } from "react-redux";
import { openScanner, closeScanner, setScannerResult } from "../slices/scannerSlice";
import registerActions from "../actions/registerActions.js";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const dispatch = useDispatch();
  const [rollNo, setRollNo] = useState("");
  const scannerResult = useSelector((state) => state.scanner.scannerResult)
  const isScannerOpen = useSelector((state) => state.scanner.isScannerOpen)

  const handleCreateOutEntry = async () => {
    try {
      const res = await registerActions.createOutEntry(rollNo);
      console.log(res);

      if (res.statusCode === 200) {
        successToast(res.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        warnToast(error.response.data.message);

      } else if (error.response && error.response.status === 404) {
        warnToast(error.response.data.message);
      }
    } finally {
      setRollNo('');
      dispatch(setScannerResult(""));
    }
  }


  const handleCreateInEntry = async () => {
    try {
      const res = await registerActions.createInEntry(rollNo);
      console.log(res);

      if (res.statusCode === 200) {
        successToast(res.message);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 409) {
        warnToast(error.response.data.message);
      } else if (error.response && error.response.status === 404) {
        warnToast(error.response.data.message);
      }
    } finally {
      setRollNo('');
      dispatch(setScannerResult(""));
    }
  }


  useEffect(() => {
    if (scannerResult) {
      setRollNo(scannerResult)
    }
  }, [scannerResult])

  const successToast = (msg) => {
    toast.success(msg, {
      position: "top-right",
    });
  }
  const warnToast = (msg) => {
    toast.warn(msg, {
      position: "top-right",
    });
  }

  return (
    <section className="bg-black w-full">
      <ToastContainer />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative flex items-end py-4 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
          <div className="absolute inset-0">
            <img
              className="h-full w-full object-cover object-top"
              src="https://www.iitg.ac.in/johnjose/GIAN/Leisure_images/iitggate.jpg"
              alt=""
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

          <div className="relative">
            <div className="w-full max-w-xl xl:mx-auto xl:w-full xl:max-w-xl xl:pr-24 mt-[390px]">
              <div className="text-4xl font-bold text-white flex flex-col">
                <h3>Student Entry-Exit System</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <p className="mt-2 mb-8 text-base text-gray-600 dark:text-gray-300">
              <Link
                to={"/"}
                className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700 flex items-center gap-3"
              >
                <FaBackward />
                Back to all Students' List
              </Link>
            </p>
            <h2 className="text-3xl font-bold mb-10 leading-tight text-white dark:text-white sm:text-4xl">
              Create New Entry
            </h2>
            <div className="flex flex-wrap justify-between">
              <button
                onClick={() => { dispatch(openScanner()) }}
                className="bg-blue-500 letter-spacing: 0.025em hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
              >
                Scan ID-Card
              </button>
              <button
                onClick={() => { dispatch(closeScanner()); dispatch(setScannerResult("")); setRollNo("") }}
                className="bg-blue-500 letter-spacing: 0.025em hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
              >
                Input Roll No.
              </button>
            </div>
            <div>
              {!scannerResult
                ? (isScannerOpen ? <BarcodeScanner /> : null)
                : <div className="text-centre text-green-900 p-5 m-4 bg-slate-300 rounded-lg">Barcode Scanned, Please create entry.</div>}
              {!isScannerOpen && !scannerResult
                ? <div className="mt-2.5">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 text-white dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                    type="text"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    placeholder="Enter Roll No"
                  ></input>
                </div>
                : null}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                className="bg-blue-500 letter-spacing: 0.025em hover:bg-blue-700 text-white font-bold py-3 px-6 rounded mt-2"
                onClick={handleCreateOutEntry}
              >
                Create Out Entry
              </button>
              <button
                className="bg-blue-500 letter-spacing: 0.025em hover:bg-blue-700 text-white font-bold py-3 px-6 rounded mt-2"
                onClick={handleCreateInEntry}
              >
                Create In Entry
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;