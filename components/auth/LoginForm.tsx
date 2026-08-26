"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  HeartPulse,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRound,
  UsersRound,
} from "lucide-react";
import { toast } from "sonner";

import { loginUser } from "@/lib/auth";
import { UserRole, RoleOptions } from "@/config/roles";
import { useAuth } from "@/providers/AuthProvider";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const LoginSchema = z.object({
  role: z.nativeEnum(UserRole),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),

  password: z.string().min(1, "Password is required"),
});

type LoginValues = z.infer<typeof LoginSchema>;

const roleVisuals: Record<
  UserRole,
  {
    icon: React.ElementType;
    color: string;
    background: string;
  }
> = {
  [UserRole.DOCTOR]: {
    icon: Stethoscope,
    color: "text-blue-600",
    background: "bg-blue-50",
  },
  [UserRole.NURSE]: {
    icon: HeartPulse,
    color: "text-rose-600",
    background: "bg-rose-50",
  },
  [UserRole.PHARMACY]: {
    icon: Building2,
    color: "text-violet-600",
    background: "bg-violet-50",
  },
  [UserRole.LAB]: {
    icon: Sparkles,
    color: "text-amber-600",
    background: "bg-amber-50",
  },
  [UserRole.ADMISSION]: {
    icon: UsersRound,
    color: "text-cyan-600",
    background: "bg-cyan-50",
  },
  [UserRole.NURSEADMIN]: {
    icon: Sparkles,
    color: "text-cyan-600",
    background: "bg-cyan-50",
  },
  [UserRole.RMO]: {
    icon: UsersRound,
    color: "text-cyan-600",
    background: "bg-cyan-50",
  },
  [UserRole.BILLING]: {
    icon: UsersRound,
    color: "text-cyan-600",
    background: "bg-cyan-50",
  },
};

export default function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),

    defaultValues: {
      email: "",
      password: "",
      role: UserRole.DOCTOR,
    },
  });

  const selectedRole = form.watch("role");
  const selectedRoleVisual =
    roleVisuals[selectedRole] ?? roleVisuals[UserRole.DOCTOR];

  const SelectedRoleIcon = selectedRoleVisual.icon;

  async function onSubmit(values: LoginValues) {
    setIsSubmitting(true);

    try {
      const user = loginUser(values.email, values.password, values.role);

      if (!user) {
        toast.error("Invalid credentials", {
          description:
            "Please verify your email, password, and selected role.",
        });

        return;
      }

      setUser(user);

      toast.success("Login successful", {
        description: `Welcome back, ${user.name ?? "User"}!`,
      });

      router.push(`/${user.role}/dashboard`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-slate-50">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-36 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute -bottom-44 right-0 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl" />
      </div>

      {/* Premium hospital welcome panel */}
      <section className="relative hidden w-[52%] overflow-hidden bg-gradient-to-br from-[#0f4c81] via-blue-600 to-cyan-500 p-10 text-white lg:flex xl:p-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.14),transparent_42%)]" />

        {/* Decorative circles */}
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/20 bg-white/5" />
        <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full border border-white/10 bg-white/5" />
        <div className="absolute right-12 top-1/2 h-24 w-24 rounded-full border border-white/20 bg-white/10" />

        <div className="relative z-10 flex w-full flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-lg">
                <HeartPulse className="h-6 w-6" />
              </div>

              <div>
                <p className="text-lg font-bold tracking-tight">
                  Leads Health Care HMS
                </p>
                <p className="text-xs text-blue-100">
                  Intelligent Healthcare Operations
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-50 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              Secure Digital Healthcare Platform
            </div>

            <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
              Better care begins with connected teams.
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-blue-100 xl:text-lg">
              Manage patients, appointments, clinical workflows, laboratory
              reports, pharmacy dispensing, and hospital operations from one
              secure platform.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Feature
                icon={<ShieldCheck className="h-4 w-4" />}
                title="Secure"
                text="Role-based access"
              />

              <Feature
                icon={<HeartPulse className="h-4 w-4" />}
                title="Connected"
                text="Unified workflows"
              />

              <Feature
                icon={<CheckCircle2 className="h-4 w-4" />}
                title="Efficient"
                text="Faster care delivery"
              />
            </div>
          </div>

          <p className="text-xs text-blue-100/80">
            © {new Date().getFullYear()} Leads Health Care ·
            Secure staff access portal
          </p>
        </div>
      </section>

      {/* Login section */}
      <section className="relative z-10 flex min-h-screen flex-1 items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-md">
          {/* Mobile branding */}
          <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg">
              <HeartPulse className="h-6 w-6" />
            </div>

            <div>
              <p className="text-lg font-bold text-slate-800">Leads Helath Care HMS</p>
              <p className="text-xs text-slate-500">
                Hospital Management System
              </p>
            </div>
          </div>

          <Card className="overflow-hidden border-slate-200/90 bg-white/95 shadow-2xl shadow-blue-950/10 backdrop-blur-sm">
            <div className="h-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400" />

            <CardHeader className="px-6 pb-3 pt-7 sm:px-8 sm:pt-8">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${selectedRoleVisual.background} ${selectedRoleVisual.color}`}
                >
                  <SelectedRoleIcon className="h-5 w-5" />
                </div>

                <div>
                  <CardTitle className="text-2xl font-bold tracking-tight text-slate-800">
                    Welcome back
                  </CardTitle>

                  <CardDescription className="mt-1">
                    Sign in to access your workspace.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-6 pb-7 pt-4 sm:px-8 sm:pb-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit, () => {
                    toast.error("Please complete all required fields");
                  })}
                  className="space-y-5"
                >
                  {/* Role */}
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-slate-700">
                          Sign in as
                        </FormLabel>

                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger className="h-11 w-full border-slate-200 bg-slate-50/60 transition focus:border-blue-400 focus:bg-white">
                              <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {RoleOptions.map((role) => (
                              <SelectItem
                                key={role.value}
                                value={role.value}
                              >
                                {role.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-slate-700">
                          Email address
                        </FormLabel>

                        <FormControl>
                          <div className="relative">
                            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                            <Input
                              type="email"
                              autoComplete="email"
                              placeholder="name@hospital.com"
                              className="h-11 border-slate-200 bg-slate-50/60 pl-10 transition focus:border-blue-400 focus:bg-white"
                              {...field}
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel className="text-sm font-semibold text-slate-700">
                            Password
                          </FormLabel>

                          <button
                            type="button"
                            className="text-xs font-semibold text-blue-600 transition hover:text-blue-700"
                            onClick={() =>
                              toast.info(
                                "Please contact your hospital administrator to reset your password.",
                              )
                            }
                          >
                            Forgot password?
                          </button>
                        </div>

                        <FormControl>
                          <div className="relative">
                            <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                            <Input
                              type={showPassword ? "text" : "password"}
                              autoComplete="current-password"
                              placeholder="Enter your password"
                              className="h-11 border-slate-200 bg-slate-50/60 pl-10 pr-11 transition focus:border-blue-400 focus:bg-white"
                              {...field}
                            />

                            <button
                              type="button"
                              onClick={() =>
                                setShowPassword((previous) => !previous)
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                              aria-label={
                                showPassword
                                  ? "Hide password"
                                  : "Show password"
                              }
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="group h-11 w-full bg-gradient-to-r from-blue-600 via-blue-600 to-cyan-500 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-700 hover:via-blue-700 hover:to-cyan-600 hover:shadow-xl hover:shadow-blue-500/30"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in securely
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>

              {/* Security footer */}
              <div className="mt-6 flex items-start gap-2 rounded-xl border border-slate-100 bg-slate-50 p-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />

                <p className="text-xs leading-5 text-slate-500">
                  Your session is protected with role-based access controls and
                  secure authentication.
                </p>
              </div>
            </CardContent>
          </Card>

          <p className="mt-5 text-center text-xs text-slate-400">
            Need help signing in? Contact your hospital system administrator.
          </p>
        </div>
      </section>
    </main>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur-sm">
      <div className="flex items-center gap-1.5 text-blue-50">
        {icon}
        <span className="text-sm font-bold">{title}</span>
      </div>

      <p className="mt-1 text-xs text-blue-100/80">{text}</p>
    </div>
  );
}