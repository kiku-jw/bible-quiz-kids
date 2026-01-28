'use client';

import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { quizData, totalQuestions } from '@/lib/quiz-data';
import { SoundProvider, useSound } from './sound-manager';
import { QuestionCard } from './question-card';
import { StoryScreen } from './story-screen';
import { CompletionScreen } from './completion-screen';

export type Language = 'uk' | 'ru' | 'en';

function QuizContent() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answeredCount, setAnsweredCount] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [language, setLanguage] = useState<Language>('uk');

    const { playContinue, playComplete, isEnabled, toggleSound, startBackgroundMusic } = useSound();

    const currentScreen = quizData[currentIndex];
    const isQuestion = currentScreen.type === 'single' || currentScreen.type === 'multi';

    const handleStart = useCallback(() => {
        setIsStarted(true);
        startBackgroundMusic();
        // Skip the intro screen since we're "starting" from it
        setCurrentIndex(1);
    }, [startBackgroundMusic]);

    const handleContinue = useCallback(() => {
        playContinue();
        if (currentIndex < quizData.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            playComplete();
            setIsCompleted(true);
        }
    }, [currentIndex, playContinue, playComplete]);

    const handleAnswer = useCallback((isCorrect: boolean) => {
        if (isCorrect) {
            setAnsweredCount(prev => prev + 1);
        }
    }, []);

    const currentPart = currentScreen.part || 'josiah';

    return (
        <div className="min-h-screen relative flex flex-col items-center justify-center overflow-x-hidden">
            {/* Decorative background effects */}
            <div className="fixed inset-0 pointer-events-none opacity-20 z-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full" />
            </div>

            {/* Header: Transparent and minimalist */}
            <header className="fixed top-0 left-0 right-0 p-2 md:p-4 flex justify-between items-center z-50 pointer-events-none">
                <div className="flex flex-col w-full max-w-xl mx-auto pointer-events-auto">
                    {/* Progress bar: only show when in quiz */}
                    {isStarted && isQuestion && !isCompleted && (
                        <div className="w-full space-y-1">
                            <div className="flex justify-between items-center text-[10px] md:text-xs font-medium text-muted-foreground/80 px-1">
                                <span>
                                    {language === 'uk' ? 'Питання' : language === 'ru' ? 'Вопрос' : 'Question'} {answeredCount + 1} {language === 'uk' ? 'з' : language === 'ru' ? 'из' : 'of'} {totalQuestions}
                                </span>
                            </div>
                            <div className="h-1.5 bg-muted/20 backdrop-blur-sm rounded-full overflow-hidden border border-white/5 shadow-inner">
                                <motion.div
                                    className="h-full bg-primary/80 shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                                    transition={{ type: 'spring', stiffness: 50, damping: 15 }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="pointer-events-auto">
                    <button
                        onClick={toggleSound}
                        className="p-1.5 md:p-2 rounded-full bg-background/10 hover:bg-background/20 backdrop-blur-md border border-white/10 shadow-sm transition-all active:scale-90"
                    >
                        {isEnabled ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="22" y1="9" x2="16" y2="15" /><line x1="16" y1="9" x2="22" y2="15" />
                            </svg>
                        )}
                    </button>
                </div>
            </header>

            <main className="w-full z-10 flex-1 flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                    {!isStarted ? (
                        <StoryScreen
                            key="start"
                            screen={quizData[0]}
                            onContinue={handleStart}
                            language={language}
                            onLanguageChange={setLanguage}
                        />
                    ) : isCompleted ? (
                        <CompletionScreen language={language} />
                    ) : (
                        isQuestion ? (
                            <QuestionCard
                                key={`q-${currentIndex}`}
                                question={currentScreen}
                                onAnswer={handleAnswer}
                                onContinue={handleContinue}
                                language={language}
                            />
                        ) : (
                            <StoryScreen
                                key={`s-${currentIndex}`}
                                screen={currentScreen}
                                onContinue={handleContinue}
                                language={language}
                            />
                        )
                    )}
                </AnimatePresence>
            </main>

            <a
                href="https://github.com/kiku-jw/bible-quiz-kids"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-2 right-2 text-[8px] md:text-[10px] text-muted-foreground/20 hover:text-muted-foreground/40 transition-colors z-50 cursor-pointer"
            >
                v4.3.15 [Interactive]
            </a>
        </div>
    );
}

export function BibleQuiz() {
    return (
        <SoundProvider>
            <QuizContent />
        </SoundProvider>
    );
}
