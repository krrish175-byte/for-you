import { motion } from 'framer-motion';

export function LetterScreen() {
    const paragraphs = [
        "Hey... so there is no mobile UI bug. As you can see, I actually made you a website. I thought it would be better than typing this all out on WhatsApp and then pacing around with anxiety all day.",
        "So here I go... I really, really like you. I have admired you for a long time. I first noticed you months ago in class. At first, you were just another classmate, but then I started noticing how incredibly calm you always are. It sparked an interest in me. Whenever I got the chance, I would steal a glance, and you were always either focused on your laptop or listening intently. I just got more and more intrigued.",
        "Even during events, you carry this peaceful energy. Yea, sometimes you talk to your friends and have fun, but overall, you have this quiet grace about you. And I really love that.",
        "Then came Holi. That day, I saw a completely different side of you. Sabko rang lagana, then pani ke saath khelna, having so much fun... I was like, wow, this side of her exists too? I do not know if I should say this, but that day, you were the only girl jisko mene color lagaya tha (with consent obviously).",
        "Then, one day, I finally told you I liked you. I still do not know how I gathered the courage. After hitting send, I literally threw my phone away(lol). Things did not go the way I hoped back then. But the truth is, I do not want to live with regrets. I wanted to express my feelings properly, just this once, without holding anything back.",
        "I really like you, and I would love nothing more than to get to know you better. I believe actions speak louder than words, and I want to be someone who adds value and happiness to your life.",
        "If you are worried about your studies, I promise I will never be a distraction. I want to be your biggest supporter. We can study together, and I will help you stay focused on your goals. Even though I might not study as intensely as you do, I am quite good at it, and I would love to help each other grow.",
        "This is the first time I am ever doing something like this, so I might not have all the perfect words. But simply put, I want to support you, keep you smiling, and build a beautiful bond where we both grow.",
        "I am not asking for a relationship right away. All I am asking is for a chance to just talk and get to know each other for a little while. If, after that, you still feel we are not a match, I will completely respect your boundaries and never bring this up again.",
        "Take all the time you need to think about it. Thank you so much for reading this far. I know I am taking up your time, but I just had to be honest with you and with myself."
    ];

    return (
        <div className="max-w-2xl mx-auto pt-24 pb-20 px-6">
            <div className="text-center mb-16">
                <h2 className="text-[#8b9987] uppercase tracking-widest text-[11px] font-semibold mb-4">A LETTER FOR</h2>
                <h1 className="font-serif text-6xl md:text-7xl text-[#2c302e] italic mb-8">You</h1>
                <div className="w-12 h-[1px] bg-[#d3d9d0] mx-auto"></div>
            </div>

            <div className="space-y-12 relative px-4">
                {paragraphs.map((text, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="text-[#4a4f4c] leading-[2.2] text-[16px] md:text-[17px] font-light"
                    >
                        {text}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
