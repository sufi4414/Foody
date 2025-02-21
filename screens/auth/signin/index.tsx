import React, { useState } from "react";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { LinkText } from "@/components/ui/link";
import { Link } from 'expo-router';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import {
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
} from "@/components/ui/icon";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Keyboard } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle } from "lucide-react-native";
import { GoogleIcon } from "./assets/icons/google";
import { useRouter } from 'expo-router';
import { AuthLayout } from "../layout";
import { LinearGradient } from "expo-linear-gradient";
import GradientButton from "@/components/custom/gradient-button/GradientButton";
import { supabase } from "@/lib/supabase"; 
import { SafeAreaView } from "react-native-safe-area-context";
import FoodyIcon from "@/assets/Icons/Foody";

// const USERS = [
//   {
//     email: "sufi@gmail.com",
//     password: "Sufi@123",
//   },
//   {
//     email: "marc@gmail.com",
//     password: "Marc@123",
//   },
//   {
//     email: "gabriel@gmail.com",
//     password: "Gabriel@1234",
//   },
// ];

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(1, "Password is required"),
  rememberme: z.boolean().optional(),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

const LoginWithLeftBackground = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const toast = useToast();
  const [validated, setValidated] = useState({
    emailValid: true,
    passwordValid: true,
  });

  const [loading, setLoading] = useState(false);

const onSubmit = async (data: LoginSchemaType) => {
  console.log("Loggin in..");
  setLoading(true); 

  const { data: {session}, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  setLoading(false);

  if (error) {
    setValidated({ emailValid: false, passwordValid: false });
    toast.show({
      placement: "bottom right",
      render: ({ id }) => (
        <Toast nativeID={id} variant="accent" action="error">
          <ToastTitle>{error.message}</ToastTitle>
        </Toast>
      ),
    });
    return;
  }
  // ✅ Success: Redirect to home page
  toast.show({
    placement: "bottom right",
    render: ({ id }) => (
      <Toast nativeID={id} variant="accent" action="success">
        <ToastTitle>Logged in successfully!</ToastTitle>
      </Toast>
    ),
  });

  router.push("/(tabs)"); // ✅ Navigate to the home screen after login
  reset();
};

  const [showPassword, setShowPassword] = useState(false);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };
  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };
  const secondInput = React.useRef<TextInput>(null);
  const router = useRouter();
  return (
    <VStack className="max-w-[440px]" space ='md'>
        <VStack space="md">
          <FormControl
            isInvalid={!!errors?.email || !validated.emailValid}
          >
            <Controller
              defaultValue=""
              name="email"
              control={control}
              rules={{
                validate: async (value) => {
                  try {
                    await loginSchema.parseAsync({ email: value });
                    return true;
                  } catch (error: any) {
                    return error.message;
                  }
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input>
                  <InputField
                    placeholder="Email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    returnKeyType="next"
                    onSubmitEditing={() => secondInput.current?.focus()}
                    textContentType="oneTimeCode"
                  />
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorIcon as={AlertTriangle} />
              <FormControlErrorText>
                {errors?.email?.message ||
                  (!validated.emailValid && "Email ID not found")}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <FormControl
            isInvalid={!!errors.password || !validated.passwordValid}
          >
            <Controller
              defaultValue=""
              name="password"
              control={control}
              rules={{
                validate: async (value) => {
                  try {
                    await loginSchema.parseAsync({ password: value });
                    return true;
                  } catch (error: any) {
                    return error.message;
                  }
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input>
                  <InputField
                    ref={secondInput}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="done"
                    textContentType="oneTimeCode"
                  />
                  <InputSlot onPress={handleState} className="pr-3">
                    <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                  </InputSlot>
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorIcon as={AlertTriangle} />
              <FormControlErrorText>
                {errors?.password?.message ||
                  (!validated.passwordValid && "Password was incorrect")}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <HStack className="justify-between ">
            <Controller
              name="rememberme"
              defaultValue={false}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  size="sm"
                  value="Remember me"
                  isChecked={value}
                  onChange={onChange}
                  aria-label="Remember me"
                >
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel>Remember me</CheckboxLabel>
                </Checkbox>
              )}
            />
            <Link href="/forgot-password">
              <LinkText className="font-medium text-sm text-primary-700 group-hover/link:text-primary-600">
                Forgot Password?
              </LinkText>
            </Link>
          </HStack>
        </VStack>
        <VStack space="md">
          <GradientButton title="Log in" onPress={handleSubmit(onSubmit)} />
          <Button
            variant="outline"
            action="secondary"
            className="w-full gap-1"
            onPress={() => {
              console.log("Google Sign in");
            }}
          >
            <ButtonText className="font-medium">
              Continue with Google
            </ButtonText>
            <ButtonIcon as={GoogleIcon} />
          </Button>
        </VStack>
        <HStack className="self-center" space="sm">
          <Text size="md">Don't have an account?</Text>
          <Link href="/signup">
            <LinkText
              className="font-medium text-primary-700 group-hover/link:text-primary-600  group-hover/pressed:text-primary-700"
              size="md"
            >
              Sign up
            </LinkText>
          </Link>
        </HStack>
    </VStack>
  );
};

export const SignIn = () => {
  return (
    <AuthLayout>
       <LoginWithLeftBackground />
    </AuthLayout>

  );
};
