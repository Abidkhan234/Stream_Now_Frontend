"use client";

import CustomAuthForm from "@/components/Form/CustomAuthForm";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

const Error = ({
    error,
    reset,
}) => {
    return (
        <CustomAuthForm title={"Oops! Something went wrong"} className={`sm:max-w-[1000px]`} subTitle="Don't worry, it's not your fault. We're working to fix this.">
            <div className="flex items-center justify-center">
                <div className="max-w-2xl w-full">
                    {/* Main Error Card */}
                    <div className="flex flex-col gap-5">

                        {/* Icon */}
                        <div className="flex justify-center">
                            <div className="relative">

                                <div className="relative bg-red-100 rounded-full p-6">
                                    <AlertTriangle className="w-16 h-16 text-red-600" strokeWidth={2} />
                                </div>
                            </div>
                        </div>

                        {/* Error Details (Optional) */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                <p className="text-sm font-mono text-red-600 break-all">
                                    {error.message || "Unknown error occurred"}
                                </p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex justify-center">
                            {reset && (
                                <Button
                                    onClick={reset}
                                    className={`py-6 w-40`}
                                >
                                    <RefreshCw className="w-5 h-5" />
                                    Try Again
                                </Button>
                            )}
                        </div>

                        {/* Help Text */}
                        <div className="pt-4 border-t border-gray-200">
                            <p className="text-center text-sm text-gray-500">
                                If this problem persists, please contact our support team.
                            </p>
                        </div>

                    </div>

                    {/* Decorative Elements */}
                    <div className="mt-5 flex justify-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-75"></div>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-150"></div>
                    </div>
                </div>
            </div>
        </CustomAuthForm>
    );
};

export default Error;