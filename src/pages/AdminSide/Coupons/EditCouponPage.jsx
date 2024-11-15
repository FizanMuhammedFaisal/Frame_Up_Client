import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../../services/api/apiClient";
import Spinner from "../../../components/common/Animations/Spinner";
import { validateCouponEdit } from "../../../utils/validation/FormValidation.js";

export default function CouponEdit() {
  const { couponId } = useParams();
  const [coupon, setCoupon] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const fetchCoupon = async () => {
    const res = await apiClient.get(`/api/coupons/${couponId}`);
    console.log(res.data);
    return res.data.coupon;
  };

  const { data, isLoading, isError } = useQuery({
    queryFn: fetchCoupon,
    queryKey: ["coupon", couponId],
  });

  useEffect(() => {
    if (data) {
      setCoupon(data);
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCoupon((prev) => {
      const updatedCoupon = prev ? { ...prev, [name]: value } : null;
      validateField(name, updatedCoupon);
      return updatedCoupon;
    });
  };

  const validateField = (fieldName, updatedCoupon) => {
    const error = validateCouponEdit({
      ...updatedCoupon,
      [fieldName]: updatedCoupon[fieldName],
    });
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateCouponEdit(coupon);
    if (validationError) {
      setErrors((prev) => ({ ...prev, form: validationError }));
      return;
    }
    setErrors({});

    try {
      await apiClient.put(`/api/coupons/update/${couponId}`, coupon);
      toast.success("Coupon Updated");
      setCoupon(null);
      navigate("/dashboard/coupons");
    } catch (err) {
      console.error("Failed to update coupon:", err);
      if (err.response && err.response.data.errors) {
        const errorMessages = err.response.data.errors
          .map((error) => error.msg)
          .join(", ");
        setErrors((prev) => ({ ...prev, form: errorMessages }));
      } else if (err.response && err.response.data.message) {
        setErrors((prev) => ({ ...prev, form: err.response.data.message }));
      } else {
        setErrors((prev) => ({ ...prev, form: "An error occurred" }));
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner center={true} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center">Failed to load coupon</div>
    );
  }

  return (
    <div className="p-8 rounded-lg w-full lg:max-w-full font-primary mx-auto md:px-20 mt-10">
      <h1 className="text-4xl font-primary font-bold mb-6 text-start">
        Edit Coupon
      </h1>

      {errors.form && (
        <div className="dark:bg-customP2BackgroundD bg-red-100 dark:border-customP2ForegroundD_600 border bg-customP2ForeGroundW_500 py-2 mb-4 rounded-lg">
          <p className="text-red-900 dark:text-red-500 ms-4 text-start">
            {errors.form}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label
            htmlFor="code"
            className="block text-sm font-semibold mb-2 text-gray-700 dark:text-slate-200"
          >
            Coupon Code
          </label>
          <input
            type="text"
            id="code"
            name="code"
            value={coupon?.code || ""}
            onChange={handleInputChange}
            placeholder="Enter coupon code"
            className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-customP2Primary focus:border-customP2Primary dark:border-customP2ForegroundD_400 dark:bg-customP2BackgroundD_darkest sm:text-sm dark:text-slate-50"
          />
          {errors.code && (
            <p className="text-red-500 text-sm mt-1">{errors.code}</p>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="discountType"
            className="block text-sm font-semibold mb-2 text-gray-700 dark:text-slate-200"
          >
            Discount Type
          </label>
          <select
            id="discountType"
            name="discountType"
            value={coupon?.discountType || ""}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-customP2Primary focus:border-customP2Primary dark:border-customP2ForegroundD_400 dark:bg-customP2BackgroundD_darkest sm:text-sm dark:text-slate-50"
          >
            <option value="">Select type</option>
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed Amount</option>
          </select>
          {errors.discountType && (
            <p className="text-red-500 text-sm mt-1">{errors.discountType}</p>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="discountAmount"
            className="block text-sm font-semibold mb-2 text-gray-700 dark:text-slate-200"
          >
            Discount Amount
          </label>
          <input
            type="number"
            id="discountAmount"
            name="discountAmount"
            value={coupon?.discountAmount || ""}
            onChange={handleInputChange}
            placeholder="Enter discount amount"
            className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-customP2Primary focus:border-customP2Primary dark:border-customP2ForegroundD_400 dark:bg-customP2BackgroundD_darkest sm:text-sm dark:text-slate-50"
          />
          {errors.discountAmount && (
            <p className="text-red-500 text-sm mt-1">{errors.discountAmount}</p>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="maxDiscountAmount"
            className="block text-sm font-semibold mb-2 text-gray-700 dark:text-slate-200"
          >
            Max Discount Amount
          </label>
          <input
            type="number"
            id="maxDiscountAmount"
            name="maxDiscountAmount"
            value={coupon?.maxDiscountAmount || ""}
            onChange={handleInputChange}
            placeholder="Enter max discount amount"
            className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-customP2Primary focus:border-customP2Primary dark:border-customP2ForegroundD_400 dark:bg-customP2BackgroundD_darkest sm:text-sm dark:text-slate-50"
          />
          {errors.maxDiscountAmount && (
            <p className="text-red-500 text-sm mt-1">
              {errors.maxDiscountAmount}
            </p>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="minPurchaseAmount"
            className="block text-sm font-semibold mb-2 text-gray-700 dark:text-slate-200"
          >
            Min Purchase Amount
          </label>
          <input
            type="number"
            id="minPurchaseAmount"
            name="minPurchaseAmount"
            value={coupon?.minPurchaseAmount || ""}
            onChange={handleInputChange}
            placeholder="Enter min purchase amount"
            className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-customP2Primary focus:border-customP2Primary dark:border-customP2ForegroundD_400 dark:bg-customP2BackgroundD_darkest sm:text-sm dark:text-slate-50"
          />
          {errors.minPurchaseAmount && (
            <p className="text-red-500 text-sm mt-1">
              {errors.minPurchaseAmount}
            </p>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="validFrom"
            className="block text-sm font-semibold mb-2 text-gray-700 dark:text-slate-200"
          >
            Valid From
          </label>
          <input
            type="datetime-local"
            id="validFrom"
            name="validFrom"
            value={
              coupon?.validFrom
                ? new Date(coupon.validFrom).toISOString().slice(0, 16)
                : ""
            }
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-customP2Primary focus:border-customP2Primary dark:border-customP2ForegroundD_400 dark:bg-customP2BackgroundD_darkest sm:text-sm dark:text-slate-50"
          />
          {errors.validFrom && (
            <p className="text-red-500 text-sm mt-1">{errors.validFrom}</p>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="validTill"
            className="block text-sm font-semibold mb-2 text-gray-700 dark:text-slate-200"
          >
            Valid Till
          </label>
          <input
            type="datetime-local"
            id="validTill"
            name="validTill"
            value={
              coupon?.validTill
                ? new Date(coupon.validTill).toISOString().slice(0, 16)
                : ""
            }
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-customP2Primary focus:border-customP2Primary dark:border-customP2ForegroundD_400 dark:bg-customP2BackgroundD_darkest sm:text-sm dark:text-slate-50"
          />
          {errors.validTill && (
            <p className="text-red-500 text-sm mt-1">{errors.validTill}</p>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="status"
            className="block text-sm font-semibold mb-2 text-gray-700 dark:text-slate-200"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={coupon?.status || ""}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-customP2Primary focus:border-customP2Primary dark:border-customP2ForegroundD_400 dark:bg-customP2BackgroundD_darkest sm:text-sm dark:text-slate-50"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status}</p>
          )}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-customP2BackgroundD_800 hover:bg-customP2BackgroundD_500 text-white px-4 py-2 rounded-md transition"
          >
            Update Coupon
          </button>
        </div>
      </form>
    </div>
  );
}
