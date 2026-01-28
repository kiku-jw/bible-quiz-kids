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

    // Deduplicate images from quizData
    const uniqueImages = Array.from(new Set(quizData.filter(q => q.image).map(q => q.image)))
        .map(src => {
            const quizItem = quizData.find(q => q.image === src);
            return {
                src: src!,
                title: quizItem?.question || { uk: 'Особливий момент', ru: 'Особый момент', en: 'Special Moment' },
                alt: { uk: 'Спогад', ru: 'Воспоминание', en: 'Memory' }
            };
        });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen w-full relative text-[#311c0f] flex flex-col items-center py-6 md:py-10 px-4 overflow-y-auto overflow-x-hidden"
        >
            {/* Premium Mesh Gradient Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[#fdf8f1]" />
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(at_0%_0%,rgba(251,191,36,0.15)_0,transparent_50%),radial-gradient(at_100%_0%,rgba(59,130,246,0.1)_0,transparent_50%),radial-gradient(at_100%_100%,rgba(251,191,36,0.15)_0,transparent_50%),radial-gradient(at_0%_100%,rgba(59,130,246,0.1)_0,transparent_50%)]" />
                <div className="absolute inset-0 opacity-[0.03] watercolor-texture" />
            </div>

            <div className="max-w-4xl w-full flex flex-col gap-8 md:gap-12 z-10">

                {/* Reward Header */}
                <div className="text-center space-y-3 md:space-y-5">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="inline-block px-6 py-2 rounded-full bg-yellow-400/20 border-2 border-yellow-500/30 text-yellow-800 text-sm font-bold mb-2 shadow-sm backdrop-blur-md"
                    >
                        {labels.badge}
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#9b5126] via-[#311c0f] to-[#9b5126] drop-shadow-sm px-4">
                        {labels.title}
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed italic px-4">
                        {labels.desc}
                    </p>
                </div>

                {/* Journey Memories - Premium Gallery */}
                <div className="space-y-6 md:space-y-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-primary/80">
                        {{ uk: 'Твоя Колекція', ru: 'Твоя Коллекция', en: 'Your Collection' }[language]}
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 px-2">
                        {uniqueImages.map((img, idx) => (
                            <motion.button
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => setSelectedImage({
                                    src: img.src,
                                    alt: img.alt,
                                    title: img.title as any
                                })}
                                className="group relative aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border-4 border-white transition-all hover:scale-105 active:scale-95 hover:shadow-2xl hover:z-20"
                            >
                                <Image
                                    src={img.src}
                                    alt=""
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Resources - Styled Buttons */}
                <div className="space-y-6 md:space-y-8 bg-white/40 backdrop-blur-xl border-2 border-white/60 rounded-[3rem] p-8 md:p-12 shadow-xl mx-4">
                    <h2 className="text-xl md:text-2xl font-bold text-center text-[#311c0f] opacity-80">{labels.learn}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto w-full">
                        {(EXTERNAL_LINKS[language] || EXTERNAL_LINKS.en).map((link, idx) => (
                            <a
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group relative flex items-center justify-center gap-3 p-5 md:p-6 rounded-2xl text-white text-base md:text-lg font-black shadow-lg transition-all active:scale-95 overflow-hidden ${link.color}`}
                            >
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 transition-transform group-hover:scale-110">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                <span className="relative z-10 tracking-tight">{link.title}</span>
                                <div className="absolute -right-4 -top-4 w-12 h-12 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="py-10 text-center">
                    <a
                        href="https://t.me/kiku_ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[10px] md:text-xs text-muted-foreground/40 hover:text-primary transition-all bg-white/20 backdrop-blur-sm border border-white/40 px-4 py-2 rounded-full hover:shadow-md"
                    >
                        <span>Created by</span>
                        <span className="font-bold tracking-widest text-[#311c0f]">KIKUAI</span>
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
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative w-full max-w-5xl aspect-video rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage.src}
                                alt={selectedImage.alt[language]}
                                fill
                                className="object-cover"
                            />

                            {/* Overlay UI */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col md:flex-row justify-between items-center md:items-end gap-4 text-center md:text-left">
                                <div className="text-white space-y-1">
                                    <p className="text-xl md:text-3xl font-black tracking-tight">{typeof selectedImage.title === 'string' ? selectedImage.title : selectedImage.title[language]}</p>
                                    <p className="text-white/50 text-xs md:text-sm font-medium uppercase tracking-widest">{labels.subline}</p>
                                </div>
                                <button
                                    onClick={() => handleDownload(selectedImage)}
                                    className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-black text-sm uppercase tracking-wider hover:bg-yellow-400 transition-all active:scale-95 shadow-2xl"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="7 10 12 15 17 10" />
                                        <line x1="12" y1="15" x2="12" y2="3" />
                                    </svg>
                                    <span>{labels.download}</span>
                                </button>
                            </div>
                        </motion.div>

                        <button
                            className="mt-8 px-6 py-2 bg-white/10 text-white/40 hover:text-white rounded-full transition-colors text-xs font-bold uppercase tracking-widest"
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
