import * as React from "react";
import { motion, type HTMLMotionProps, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

const staggerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.06,
        },
    },
};

const revealVariants: Variants = {
    hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const pageVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
        },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: {
            duration: 0.28,
            ease: [0.4, 0, 1, 1],
        },
    },
};

type MotionDivProps = HTMLMotionProps<"div">;

export function StaggeredSection({ className, children, ...props }: MotionDivProps) {
    return (
        <motion.div
            className={cn(className)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            variants={staggerVariants}
            {...props}
        >
            {children}
        </motion.div>
    );
}

export function RevealItem({ className, children, ...props }: MotionDivProps) {
    return (
        <motion.div className={cn(className)} variants={revealVariants} {...props}>
            {children}
        </motion.div>
    );
}

export function PageReveal({ className, children, ...props }: MotionDivProps) {
    return (
        <motion.div
            className={cn(className)}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageVariants}
            {...props}
        >
            {children}
        </motion.div>
    );
}
