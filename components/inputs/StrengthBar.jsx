'use client'

import { useFormikContext } from 'formik';
import { motion } from 'motion/react'

export default function StrengthBar({
    animated = true,
    fieldName = '',
    duration = 0.5,
}) {
    const { values, errors } = useFormikContext()
    const value = values[fieldName] || ''
    const fieldError = errors[fieldName] || "";

    const calculateStrength = (pwd) => {
        let score = 0

        if (!pwd) {
            return { score: 0, label: 'Enter a value', color: 'bg-gray-300', percent: 0 }
        }

        if (pwd.length >= 8) score += 2
        if (/[a-z]/.test(pwd)) score += 1
        if (/[A-Z]/.test(pwd)) score += 1
        if (/\d/.test(pwd)) score += 1
        if (/[^a-zA-Z\d]/.test(pwd)) score += 1

        let percent = (score / 7) * 100

        if (score >= 6) {
            percent = 100
        } else if (score > 4) {
            percent = (score / 7) * 100
        }

        return { percent }
    }

    const { percent } = calculateStrength(value);

    return (
        <div className="space-y-2 w-full">

            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                    {fieldError}
                </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                    initial={animated ? { width: 0 } : { width: `${percent}%` }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration, ease: 'easeOut' }}
                    className={`h-full rounded-full bg-[#11D147] transition-colors duration-300`}
                />
            </div>
            {/* Progress bar */}
        </div>
    )
}
