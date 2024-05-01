"use client";

import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type FieldType = {
  fullName?: string;
  email?: string;
  password?: string;
};

const SignupForm = () => {
  const router = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      // Make API request to login
      const response = await axios.post(
        "http://localhost:5000/api/login",
        values
      );

      // Handle successful login
      if (response?.status === 200) {
        // Display success message to the user
        toast.success("You have successfully signed in!");

        // Navigate to the home page
        router.push("/dashboard/projects");
      } else {
        // Handle other status codes (if needed)
        console.log("Unexpected status code:", response?.status);
      }
    } catch (error) {
      // Handle errors
      console.error("Error occurred during login:", error);

      // Display success message to the user
      toast.success("Invalid credentials!");
    }
  };

  return (
    <Form
      className="shadow-md rounded-md p-10 w-[70%] sm:w-[400px] space-y-3.5 bg-gradient-to-b from-blue-300 via-white to-gray-100"
      name="basic"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
    >
      <div className="space-y-1 mb-2">
        <h2 className="text-center font-bold text-3xl">Sign Up</h2>
        <p className="text-center text-gray-500">
          Create your account to access the system.
        </p>
      </div>

      <Form.Item<FieldType>
        label="Full Name"
        name="fullName"
        rules={[{ required: true, message: "Please input your fullname!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full rounded-full"
        >
          Signup
        </Button>
      </Form.Item>

      <p>
        Already have an account?{" "}
        <Link href="/" className="text-blue-500 font-semibold">
          Sign in
        </Link>
      </p>
    </Form>
  );
};

export default SignupForm;
