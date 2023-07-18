"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Axios from "@/utils/Axios";

export default function SubscriptionComponent() {
  const getData = async () => {
    try {
      let { data } = await Axios.get("/subscription", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  async function displayRazorpay(plan, price) {
    const token = localStorage.getItem("token");

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      // creating a new order
      const result = await Axios.post(
        "/subscription",
        { plan, price },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!result) {
        alert("Server error. Are you online?");
        return;
      }

      // Getting the order details back
      const { orderId } = result.data;

      const options = {
        key: "rzp_test_bHrsVB132Fbm8O", // Enter the Key ID generated from the Dashboard
        amount: price * 100,
        currency: "INR",
        name: "Soumya Corp.",
        description: "Test Transaction",
        // image: { logo },
        order_id: orderId,
        handler: async function (response) {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await Axios.post(
            "/subscription/verify-payment",
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          alert(result.data.success && "Payment success");
        },
        prefill: {
          name: "Soumya Dey",
          email: "SoumyaDey@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Soumya Dey Corporate Office",
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-red-900 dark:text-white">
            Thelicham Subscription Plans
          </h2>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {/* Pricing Card */}
          <div
            onClick={() => displayRazorpay("one-month", 29)}
            className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white"
          >
            <h3 className="mb-4 text-2xl font-semibold">One Month</h3>
            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
              Best option for personal use &amp; for your next project.
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-5xl font-extrabold">₹29</span>
            </div>
            {/* List */}
            <ul role="list" className="mb-8 space-y-4 text-left">
              <li className="flex items-center space-x-3">
                {/* Icon */}
                <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                <span>Individual configuration</span>
              </li>
              <li className="flex items-center space-x-3">
                {/* Icon */}
                <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                <span>No setup, or hidden fees</span>
              </li>
              <li className="flex items-center space-x-3">
                {/* Icon */}
                <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                <span>
                  Team size: <span className="font-semibold">1 developer</span>
                </span>
              </li>
              <li className="flex items-center space-x-3">
                {/* Icon */}
                <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                <span>
                  Premium support:{" "}
                  <span className="font-semibold">6 months</span>
                </span>
              </li>
              <li className="flex items-center space-x-3">
                {/* Icon */}
                <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                <span>
                  Free updates: <span className="font-semibold">6 months</span>
                </span>
              </li>
            </ul>
            <a
              href="#"
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-red-900"
            >
              Get started
            </a>
          </div>
          {/* Pricing Card */}
          <div
            onClick={() => displayRazorpay("three-months", 99)}
            className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white"
          >
            <h3 className="mb-4 text-2xl font-semibold">Three Months</h3>
            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
              Relevant for multiple users, extended &amp; premium support.
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-5xl font-extrabold">₹99</span>
            </div>
            {/* List */}
            <ul role="list" className="mb-8 space-y-4 text-left">
              <li className="flex items-center space-x-3">
                {/* Icon */}
                <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                <span>Individual configuration</span>
              </li>
              <li className="flex items-center space-x-3">
                {/* Icon */}
                <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                <span>No setup, or hidden fees</span>
              </li>
              <li className="flex items-center space-x-3">
                {/* Icon */}
                <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                <span>
                  Team size:{" "}
                  <span className="font-semibold">10 developers</span>
                </span>
              </li>
              <li className="flex items-center space-x-3">
                {/* Icon */}
                <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                <span>
                  Premium support:{" "}
                  <span className="font-semibold">24 months</span>
                </span>
              </li>
              <li className="flex items-center space-x-3">
                {/* Icon */}
                <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                <span>
                  Free updates: <span className="font-semibold">24 months</span>
                </span>
              </li>
            </ul>
            <a
              href="#"
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-red-900"
            >
              Get started
            </a>
          </div>
          {/* Pricing Card */}
          <div
            onClick={() => displayRazorpay("six-months", 499)}
            className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white"
          >
            <h3 className="mb-4 text-2xl font-semibold">Six Months</h3>
            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
              Best for large scale uses and extended redistribution rights.
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-5xl font-extrabold">₹499</span>
            </div>
            {/* List */}
            <ul role="list" className="mb-8 space-y-4 text-left">
              <li className="flex items-center space-x-3">
                {/* Icon */}
                <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                <span>Individual configuration</span>
              </li>
              <li className="flex items-center space-x-3">
                {/* Icon */}
                <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                <span>No setup, or hidden fees</span>
              </li>
              <li className="flex items-center space-x-3">
                {/* Icon */}
                <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                <span>
                  Team size:{" "}
                  <span className="font-semibold">100+ developers</span>
                </span>
              </li>
              <li className="flex items-center space-x-3">
                {/* Icon */}
                <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                <span>
                  Premium support:{" "}
                  <span className="font-semibold">36 months</span>
                </span>
              </li>
              <li className="flex items-center space-x-3">
                {/* Icon */}
                <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                <span>
                  Free updates: <span className="font-semibold">36 months</span>
                </span>
              </li>
            </ul>
            <a
              href="#"
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-red-900"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
