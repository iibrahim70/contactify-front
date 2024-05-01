"use client";

import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type FieldType = {
  userName?: string;
  password?: string;
  remember?: string;
};

const SigninForm = () => {
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
      initialValues={{
        userName: "admin",
        password: "abcd1234@",
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <div className="space-y-1 mb-2">
        <h2 className="text-center font-bold text-3xl">Sign In</h2>
        <p className="text-center text-gray-500">
          Enter your credentials to access the system.
        </p>
      </div>

      <Form.Item<FieldType>
        label="Username"
        name="userName"
        rules={[{ required: true, message: "Please input your username!" }]}
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

      <Form.Item<FieldType> name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full rounded-full"
        >
          Signin
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SigninForm;
