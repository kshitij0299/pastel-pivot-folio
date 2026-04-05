import React from 'react';

export const DefogCaseStudy = () => {
    return (
        <div className="w-full flex flex-col gap-[60px] md:gap-[100px] py-[30px] md:py-[60px] px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-[80px] max-w-[1440px] mx-auto bg-white text-black">

            {/* 01. The Problem */}
            <section className="flex flex-col gap-6 md:gap-10">
                <h2 className="font-playfair text-3xl md:text-5xl font-light">01. The Problem</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-rethink text-lg">
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold uppercase tracking-wide text-sm md:text-base mb-2">The Core Issue</h3>
                        <p className="font-light leading-relaxed text-gray-800">
                            Most task management apps are built for highly organized planners, requiring manual data entry, categorization, and tagging.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold uppercase tracking-wide text-sm md:text-base mb-2">The Friction</h3>
                        <p className="font-light leading-relaxed text-gray-800">
                            For unstructured thinkers, creatives, or individuals with ADHD, the cognitive load of organizing a task often prevents them from logging it at all.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold uppercase tracking-wide text-sm md:text-base mb-2">The Goal</h3>
                        <p className="font-light leading-relaxed text-gray-800">
                            Create a frictionless, voice-first capture tool that removes the need for manual structuring by utilizing AI to categorize and organize thoughts into actionable items.
                        </p>
                    </div>
                </div>
            </section>

            {/* 02. Research & Competitor Analysis */}
            <section className="flex flex-col gap-6 md:gap-10">
                <h2 className="font-playfair text-3xl md:text-5xl font-light">02. Research & Competitor Analysis</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-rethink text-lg">
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold uppercase tracking-wide text-sm md:text-base mb-2">Market Gap</h3>
                        <p className="font-light leading-relaxed text-gray-800">
                            We analyzed primary competitors (Todoist, Apple Reminders, Otter.ai). While Otter transcribes well, it lacks task extraction. Todoist and Reminders have great task management, but their voice input is rigid and requires specific syntax.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold uppercase tracking-wide text-sm md:text-base mb-2">Heuristic Evaluation</h3>
                        <p className="font-light leading-relaxed text-gray-800">
                            Existing apps suffer from "click fatigue." It takes an average of 4-6 taps to log a categorized task in traditional apps. Defog aims to reduce this to 1 tap.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold uppercase tracking-wide text-sm md:text-base mb-2">Key Insight</h3>
                        <p className="font-light leading-relaxed text-gray-800">
                            Users don't want to manage tasks; they want the app to manage the tasks for them.
                        </p>
                    </div>
                </div>
            </section>

            {/* 03. User Research & Empathy Mapping */}
            <section className="flex flex-col gap-6 md:gap-10">
                <h2 className="font-playfair text-3xl md:text-5xl font-light">03. User Research & Empathy Mapping</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 font-rethink text-lg">
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold uppercase tracking-wide text-sm md:text-base">Methodology</h3>
                        <p className="font-light leading-relaxed text-gray-800">
                            Conducted surveys with 45 participants and 1-on-1 interviews with 5 target users (creatives, founders, students).
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold uppercase tracking-wide text-sm md:text-base">Survey Data</h3>
                        <ul className="list-disc list-inside font-light leading-relaxed text-gray-800 space-y-2">
                            <li><span className="font-medium">78%</span> of users abandon rigid to-do list methods within the first two weeks.</li>
                            <li><span className="font-medium">65%</span> rely on scattered physical notebooks or unstructured notes apps (like Apple Notes) because it's "faster."</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col gap-4 font-rethink text-lg mt-4">
                    <h3 className="font-bold uppercase tracking-wide text-sm md:text-base">User Persona - 'Alex the Overwhelmed Creator'</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <span className="font-medium">Needs:</span> <span className="font-light text-gray-800">A way to brain-dump while driving or walking.</span>
                        </div>
                        <div>
                            <span className="font-medium">Frustrations:</span> <span className="font-light text-gray-800">Forgetting brilliant ideas because opening a productivity app takes too much time.</span>
                        </div>
                    </div>
                </div>

                {/* Image Placeholders */}
                <div className="grid grid-cols-1 gap-8 mt-6">
                    <div className="w-full aspect-[16/9] bg-gray-50 rounded-lg overflow-hidden">
                        <img
                            src="https://res.cloudinary.com/dnsylvhmw/image/upload/f_auto,q_auto/v1771186858/user_persona_and_empathy_map_4_defog_tpwnty.png"
                            alt="User Persona & Empathy Map"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="w-full aspect-[16/9] bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                        <iframe
                            style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
                            width="800"
                            height="450"
                            src="https://embed.figma.com/board/Rg9D9KB1HAW4Ferg60PxUS/Defog-Core-User-Flow?node-id=0-1&embed-host=share"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* 04. Design Process & Wireframing */}
            <section className="flex flex-col gap-6 md:gap-10">
                <h2 className="font-playfair text-3xl md:text-5xl font-light">04. Design Process & Wireframing</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-rethink text-lg">
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold uppercase tracking-wide text-sm md:text-base mb-2">Information Architecture</h3>
                        <p className="font-light leading-relaxed text-gray-800">
                            Prioritized a bottom-heavy design for accessibility and reachability, inspired by Apple's Human Interface Guidelines.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold uppercase tracking-wide text-sm md:text-base mb-2">Low-Fidelity</h3>
                        <p className="font-light leading-relaxed text-gray-800">
                            Started with rapid black-and-white sketches focusing entirely on the voice-recording interaction and the post-processing state.
                        </p>
                    </div>
                </div>

                {/* Figma Prototype Embed */}
                <div className="mt-6 flex flex-col gap-3">
                    <div className="w-full aspect-[16/9] bg-gray-50 rounded-lg overflow-hidden border border-gray-200 relative">
                        <iframe
                            src="https://dice-vector-81290348.figma.site/"
                            className="absolute top-0 left-0 w-[153.8%] h-[153.8%] origin-top-left scale-[0.65]"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <p className="font-rethink text-sm text-gray-500 text-center uppercase tracking-wide">
                        Interactive Low-Fidelity Prototype made in Figma Make(<a href="https://dice-vector-81290348.figma.site/" target="_blank" rel="noopener noreferrer" className="underline hover:text-black">Click Here</a> if you're on a mobile device)
                    </p>
                </div>

                <div className="flex flex-col gap-2 font-rethink text-lg mt-4">
                    <h3 className="font-bold uppercase tracking-wide text-sm md:text-base mb-2">Mid-to-High Fidelity</h3>
                    <p className="font-light leading-relaxed text-gray-800">
                        Transitioned to high-fidelity, focusing on visual hierarchy. Stripped away heavy navigation bars to keep the cognitive load minimal.
                    </p>
                </div>
            </section>

            {/* 05. Usability Testing & Iteration */}
            <section className="flex flex-col gap-6 md:gap-10">
                <h2 className="font-playfair text-3xl md:text-5xl font-light">05. Usability Testing & Iteration</h2>

                <div className="font-rethink text-lg">
                    <h3 className="font-bold uppercase tracking-wide text-sm md:text-base mb-2">The Test</h3>
                    <p className="font-light leading-relaxed text-gray-800 mb-6">
                        Conducted task-based usability testing via screen sharing with 4 users using a mid-fidelity prototype.
                    </p>

                    <h3 className="font-bold uppercase tracking-wide text-sm md:text-base mb-4">Feedback & Iteration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-[#fbe4e2] p-6 rounded-lg">
                            <h4 className="font-bold mb-2">Issue</h4>
                            <p className="font-light">Users weren't sure when the AI had finished processing their voice note.</p>
                        </div>
                        <div className="bg-[#e7f1e7] p-6 rounded-lg">
                            <h4 className="font-bold mb-2">Fix</h4>
                            <p className="font-light">Implemented a soft, glowing micro-interaction and an AI "thinking" state to provide immediate system feedback.</p>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg">
                            <h4 className="font-bold mb-2">Accessibility Check</h4>
                            <p className="font-light">Adjusted the contrast ratio of the secondary text to meet WCAG AA standards and ensured the main action button was easily reachable with one thumb.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 06. Solution & Results */}
            <section className="flex flex-col gap-6 md:gap-10">
                <h2 className="font-playfair text-3xl md:text-5xl font-light">06. Solution & Results</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 font-rethink text-lg">
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold uppercase tracking-wide text-sm md:text-base">The Impact</h3>
                        <p className="font-light leading-relaxed text-gray-800">
                            By moving beyond traditional UI and utilizing AI to solve the core user problem (friction), Defog transformed how users capture their day.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold uppercase tracking-wide text-sm md:text-base">Simulated Testing Results</h3>
                        <div className="flex flex-row justify-between md:justify-start md:gap-16">
                            <div className="flex flex-col items-center md:items-start">
                                <span className="font-playfair text-4xl md:text-5xl font-bold text-black mb-1">85%</span>
                                <span className="text-sm font-light text-center md:text-left text-gray-600">Decrease in<br />time-to-capture</span>
                            </div>
                            <div className="flex flex-col items-center md:items-start">
                                <span className="font-playfair text-4xl md:text-5xl font-bold text-black mb-1">4.2x</span>
                                <span className="text-sm font-light text-center md:text-left text-gray-600">Increase in<br />daily tasks logged</span>
                            </div>
                            <div className="flex flex-col items-center md:items-start">
                                <span className="font-playfair text-4xl md:text-5xl font-bold text-black mb-1">73%</span>
                                <span className="text-sm font-light text-center md:text-left text-gray-600">Retention rate<br />after week 1</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 font-rethink text-lg mt-4 bg-black text-white p-8 rounded-xl">
                    <h3 className="font-bold uppercase tracking-wide text-sm md:text-base mb-2 text-[#f29f97]">Learnings & Growth</h3>
                    <p className="font-light leading-relaxed opacity-90">
                        The most impactful design work happens when you move beyond the UI to diagnose the core behavioral problem. Trust in AI is not a given; it was consciously designed through transparent loading states and clear communication.
                    </p>
                </div>
            </section>

        </div>
    );
};
