'use client';

import { motion } from 'framer-motion';
import type { QuizQuestion } from '@/lib/quiz-data';
import type { Language } from './bible-quiz';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface StoryScreenProps {
    screen: QuizQuestion;
    onContinue: () => void;
    language: Language;
    onLanguageChange?: (lang: Language) => void;
}

const LANGUAGES = [
    { code: 'uk', label: 'Українська', flag: '🇺🇦' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
] as const;

export function StoryScreen({ screen, onContinue, language, onLanguageChange }: StoryScreenProps) {
    const bgImage = screen.bgImage || (screen.type === 'intro' ? '/bible-quiz-kids/images/intro.jpg' :
        screen.type === 'transition' ? '/bible-quiz-kids/images/transition.jpg' : '/bible-quiz-kids/images/finale.jpg');

    const illustration = screen.image;
    const isIntro = screen.type === 'intro';
    const TitleTag = isIntro ? 'h1' : 'h2';

    const getTitle = () => {
        if (screen.type === 'intro') {
            return language === 'uk' ? 'Початок подорожі' : language === 'ru' ? 'Начало путешествия' : 'The Beginning';
        }
        if (screen.type === 'transition') {
            if (screen.part === 'jeremiah') {
                return language === 'uk' ? 'Нова історія' : language === 'ru' ? 'Новая история' : 'New Story';
            }
            return language === 'uk' ? 'Час перепочити' : language === 'ru' ? 'Время отдохнуть' : 'Time to Rest';
        }
        return language === 'uk' ? 'Ти молодець!' : language === 'ru' ? 'Ты молодец!' : 'Well Done!';
    };

    const getButtonText = () => {
        if (isIntro) {
            return language === 'uk' ? 'Розпочати подорож' : language === 'ru' ? 'Начать путешествие' : 'Start Journey';
        }
        return language === 'uk' ? 'Продовжити' : language === 'ru' ? 'Продолжить' : 'Continue';
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
        >
            <div className="absolute inset-0 z-0">
                <Image
                    src={bgImage}
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
            </div>

            <div className="max-w-3xl mx-auto text-center px-4 relative z-10">
                <div className="bg-card/90 backdrop-blur-md border border-border rounded-2xl p-4 md:p-6 shadow-xl watercolor-texture mb-4 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 via-primary/80 to-primary/40" />

                    {illustration && (
                        <div className="relative w-full aspect-video mb-4 md:mb-6 rounded-xl overflow-hidden shadow-lg border-2 border-primary/10">
                            <Image
                                src={illustration}
                                alt=""
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    {isIntro && onLanguageChange && (
                        <div className="flex justify-center gap-2 mb-6">
                            {LANGUAGES.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => onLanguageChange(lang.code)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-full text-xs font-bold transition-all border shrink-0",
                                        language === lang.code
                                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                            : "bg-background/50 text-muted-foreground border-border hover:bg-background"
                                    )}
                                >
                                    <span className="mr-1.5">{lang.flag}</span>
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                    )}

                    <TitleTag className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-5 leading-tight">
                        {getTitle()}
                    </TitleTag>

                    <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-4 md:mb-6 text-balance italic">
                        {screen.text?.[language]}
                    </p>

                    <button
                        onClick={onContinue}
                        className="px-8 py-3 bg-primary text-primary-foreground rounded-full text-lg font-bold shadow-lg hover:bg-primary/90 transition-all transform hover:scale-105 active:scale-95"
                    >
                        {getButtonText()}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
