'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { Language } from './bible-quiz';
import { quizData } from '@/lib/quiz-data';

const GALLERY_IMAGES = [
    {
        src: '/bible-quiz-kids/illustrations/intro.png',
        alt: { uk: 'Початок подорожі', ru: 'Начало путешествия', en: 'The Beginning' },
        title: { uk: 'Початок подорожі', ru: 'Начало путешествия', en: 'The Beginning' }
    },
    {
        src: '/bible-quiz-kids/illustrations/q1.png',
        alt: { uk: 'Помазання на царство', ru: 'Помазание на царство', en: 'Anointing as King' },
        title: { uk: 'Помазання на царство', ru: 'Помазание на царство', en: 'Anointing as King' }
    },
    {
        src: '/bible-quiz-kids/illustrations/q7.png',
        alt: { uk: 'Знайдена Книга Закону', ru: 'Найденная Книга Закона', en: 'Found Book of Law' },
        title: { uk: 'Знайдена Книга Закону', ru: 'Найденная Книга Закона', en: 'Found Book of Law' }
    },
    {
        src: '/bible-quiz-kids/illustrations/q15.png',
        alt: { uk: 'Пророк Єремія', ru: 'Пророк Иеремия', en: 'Prophet Jeremiah' },
        title: { uk: 'Пророк Єремія', ru: 'Пророк Иеремия', en: 'Prophet Jeremiah' }
    },
    {
        src: '/bible-quiz-kids/illustrations/q22.png',
        alt: { uk: 'Вогонь у серці', ru: 'Огонь в сердце', en: 'Fire in the Heart' },
        title: { uk: 'Вогонь у серці', ru: 'Огонь в сердце', en: 'Fire in the Heart' }
    },
    {
        src: '/bible-quiz-kids/illustrations/finale.png',
        alt: { uk: 'Радісне майбутнє', ru: 'Радостное будущее', en: 'Joyful Future' },
        title: { uk: 'Радісне майбутнє', ru: 'Радостное будущее', en: 'Joyful Future' }
    },
];

const EXTERNAL_LINKS = {
    uk: [
        { title: 'Фільм про Йосію', url: 'https://www.jw.org/finder?wtlocale=K&docid=1102019289&srcid=share', color: 'bg-orange-600 hover:bg-orange-700' },
        { title: 'Мультик про Єремію', url: 'https://www.jw.org/finder?wtlocale=K&docid=503000104&srcid=share', color: 'bg-blue-600 hover:bg-blue-700' }
    ],
    ru: [
        { title: 'Фильм об Иосии', url: 'https://www.jw.org/finder?wtlocale=U&docid=1102019289&srcid=share', color: 'bg-orange-600 hover:bg-orange-700' },
        { title: 'Мультик об Иеремии', url: 'https://www.jw.org/finder?wtlocale=U&docid=503000104&srcid=share', color: 'bg-blue-600 hover:bg-blue-700' }
    ],
    en: [
        { title: 'Josiah Movie', url: 'https://www.jw.org/finder?wtlocale=E&docid=1102019289&srcid=share', color: 'bg-orange-600 hover:bg-orange-700' },
        { title: 'Jeremiah Video', url: 'https://www.jw.org/finder?wtlocale=E&docid=503000104&srcid=share', color: 'bg-blue-600 hover:bg-blue-700' }
    ]
};

interface CompletionScreenProps {
    language: Language;
}

export function CompletionScreen({ language }: CompletionScreenProps) {
    const [selectedImage, setSelectedImage] = useState<typeof GALLERY_IMAGES[0] | null>(null);

    const handleDownload = (img: typeof GALLERY_IMAGES[0]) => {
        const link = document.createElement('a');
        link.href = img.src;
        link.download = `${img.src.split('/').pop()}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const labels = ({
        uk: { badge: '🏆 НАГОРОДА ЗА СТАРАННІСТЬ 🏆', title: 'Ти справжній знавець Біблії!', desc: 'Твої старання не залишилися непоміченими. В подарунок ти отримуєш колекцію красивих шпалер для твого пристрою.', learn: 'Продовжуй дізнаватися нове', close: 'Закрити', download: 'Скачати шпалери', subline: 'Чудова картинка для твого робочого столу' },
        ru: { badge: '🏆 НАГРАДА ЗА СТАРАНИЕ 🏆', title: 'Ты настоящий знаток Библии!', desc: 'Твои старания не остались незамеченными. В подарок ты получаешь коллекцию красивых обоев для твоего устройства.', learn: 'Продолжай узнавать новое', close: 'Закрыть', download: 'Скачать обои', subline: 'Отличная картинка для твоего рабочего стола' },
        en: { badge: '🏆 REWARD FOR DILIGENCE 🏆', title: 'You are a Bible expert!', desc: 'Your efforts did not go unnoticed. As a gift, you receive a collection of beautiful wallpapers for your device.', learn: 'Keep learning new things', close: 'Close', download: 'Download wallpaper', subline: 'A beautiful picture for your desktop' },
    } as Record<Language, any>)[language] || { badge: '', title: '', desc: '', learn: '', close: '', download: '', subline: '' };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen w-full bg-[#fdf8f1] relative text-[#311c0f] flex flex-col items-center py-6 md:py-10 px-4 overflow-y-auto"
        >
            {/* Rich Background Elements - CSS Only */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                {/* Subtle paper-like texture using SVG filter or noise if possible, but let's stick to gradients for reliability */}
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.15]" />
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-primary/5 to-accent/10 opacity-60" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(253,248,241,1)_0%,rgba(253,248,241,0)_100%)]" />

                {/* Decorative blobs */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-4xl w-full flex flex-col gap-8 md:gap-12 z-10">

                {/* Reward Header */}
                <div className="text-center space-y-3 md:space-y-5">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="inline-block p-4 rounded-3xl bg-yellow-400/20 border-2 border-yellow-500/30 text-yellow-800 font-bold mb-2 shadow-sm backdrop-blur-sm"
                    >
                        {labels.badge}
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#9b5126] via-[#311c0f] to-[#9b5126] drop-shadow-sm">
                        {labels.title}
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-tight italic">
                        {labels.desc}
                    </p>
                </div>

                {/* Journey Memories */}
                {quizData.some(q => q.image) && (
                    <div className="space-y-4 md:space-y-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-center text-primary/80">
                            {{ uk: 'Твоя Колекція', ru: 'Твоя Коллекция', en: 'Your Collection' }[language]}
                        </h2>
                        <div className="flex flex-wrap justify-center gap-3 md:gap-6 pb-6">
                            {quizData.filter(q => q.image).map((img, idx) => (
                                <motion.button
                                    key={img.id}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    onClick={() => setSelectedImage({
                                        src: img.image!,
                                        alt: { uk: 'Спогад', ru: 'Воспоминание', en: 'Memory' },
                                        title: { uk: 'Особливий момент', ru: 'Особый момент', en: 'Special Moment' }
                                    })}
                                    className="group relative w-32 h-32 md:w-48 md:h-48 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border-4 border-white transition-all hover:scale-105 active:scale-95 hover:shadow-xl hover:z-20"
                                >
                                    <Image
                                        src={img.image!}
                                        alt=""
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Gallery */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                    {GALLERY_IMAGES.map((img, idx) => (
                        <motion.button
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => setSelectedImage(img)}
                            className="group relative aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-md border-2 md:border-4 border-white transform transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                            <Image
                                src={img.src}
                                alt={img.alt[language]}
                                fill
                                className="object-cover"
                            />
                        </motion.button>
                    ))}
                </div>

                {/* Resources */}
                <div className="space-y-4 md:space-y-6">
                    <h2 className="text-xl md:text-2xl font-bold text-center">{labels.learn}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto w-full">
                        {(EXTERNAL_LINKS[language] || EXTERNAL_LINKS.en).map((link, idx) => (
                            <a
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center justify-center gap-2 p-3 md:p-4 rounded-xl text-white text-sm md:text-base font-bold shadow-md transition-all active:scale-95 ${link.color}`}
                            >
                                <span>{link.title}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-6 md:pt-10 text-center">
                    <a
                        href="https://t.me/kiku_ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs md:text-sm text-muted-foreground/60 hover:text-primary transition-colors bg-black/5 px-3 py-1.5 rounded-full"
                    >
                        <span>Created by</span>
                        <span className="font-semibold">KikuAI</span>
                    </a>
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage.src}
                                alt={selectedImage.alt[language]}
                                fill
                                className="object-cover"
                            />

                            {/* Overlay UI */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end">
                                <div className="text-white space-y-1">
                                    <p className="text-xl md:text-2xl font-bold">{selectedImage.title[language]}</p>
                                    <p className="text-white/60 text-sm md:text-base">{labels.subline}</p>
                                </div>
                                <button
                                    onClick={() => handleDownload(selectedImage)}
                                    className="p-3 md:p-4 bg-white text-black rounded-full shadow-lg hover:bg-white/90 transition-all active:scale-90 flex items-center justify-center"
                                    title={labels.download}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4" />
                                        <polyline points="7 10 12 15 17 10" />
                                        <line x1="12" y1="15" x2="12" y2="3" />
                                    </svg>
                                </button>
                            </div>
                        </motion.div>

                        <button
                            className="mt-6 text-white/50 hover:text-white transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            {labels.close}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
