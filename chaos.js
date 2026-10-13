/* Intentional bad UI inspired by r/badUIbattles. No server, no tracking, no real credentials. */
(() => {
    'use strict';
    const $ = (selector) => document.querySelector(selector);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const modal = $('#anti-security');
    const visibleCode = $('#anti-visible-code');
    const input = $('#anti-pin');
    const form = $('#anti-security-form');
    const verify = $('#anti-verify');
    const message = $('#anti-verification-message');
    const toastBox = $('#anti-toast');
    const particles = $('#anti-particles');
    const pin = String(Math.floor(1000 + Math.random() * 9000));
    visibleCode.textContent = pin; // 100% "secure": display the one-time code on the same page.
    modal.hidden = false;
    input.focus();

    let toastTimeout;
    function toast(words) {
        toastBox.textContent = words;
        toastBox.hidden = false;
        window.clearTimeout(toastTimeout);
        toastTimeout = window.setTimeout(() => { toastBox.hidden = true; }, 2600);
    }

    function disintegrate(button) {
        if (reducedMotion) return;
        const r = button.getBoundingClientRect();
        const n = 17;
        const cols = 5;
        for (let i = 0; i < n; i++) {
            const piece = document.createElement('span');
            piece.className = 'anti-fragment';
            const w = Math.max(5, r.width / cols);
            const h = Math.max(5, r.height / 4);
            piece.style.cssText = `left:${r.left + (i % cols) * w}px;top:${r.top + (Math.floor(i / cols) % 4) * h}px;width:${w}px;height:${h}px;background:${i % 2 ? '#ffff00' : '#00ff44'};--dx:${Math.round((Math.random()-.5)*230)}px;--dy:${Math.round((Math.random()-.5)*190)}px;--dr:${Math.round((Math.random()-.5)*260)}deg`;
            particles.appendChild(piece);
            window.setTimeout(() => piece.remove(), 650);
        }
    }

    // #2: Like the Reddit disappearing submit button, incomplete forms make it evaporate.
    let verifyShy = false;
    verify.addEventListener('pointerenter', () => {
        if (input.value.trim() !== pin && !verifyShy) {
            verifyShy = true;
            disintegrate(verify);
            verify.style.opacity = '0.08';
            verify.style.pointerEvents = 'none';
            message.textContent = 'NUPP KADUS, sest sa pole PIN-koodi õigesti sisestanud!';
            window.setTimeout(() => {
                verify.style.opacity = '';
                verify.style.pointerEvents = '';
                verifyShy = false;
            }, 650);
        }
    });
    input.addEventListener('input', () => {
        input.value = input.value.replace(/[^\d]/g, '').slice(0, 4);
        message.textContent = input.value === pin ? '!!! VAU, SA TEAD KOODI, MIS ON EKRAANIL !!!' : 'Sisesta kood, mis on otse sinu ees.';
    });
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (input.value !== pin) {
            message.textContent = 'VALE!!! Vaata kollast kasti. Seal ongi kood.';
            disintegrate(verify);
            toast('LIGIPÄÄS KEELATUD! Kood on ju ekraanil.');
            return;
        }
        modal.hidden = true;
        toast('PALJU ÕNNE! Läbisid maailma kõige mõttetuma turvakontrolli.');
        window.setTimeout(() => toast('REKLAAM EI LÄHE ISE ÄRA!!!'), 3000);
    });

    // #2: The jump-to-timetable link flees the mouse instead of being helpful.
    const fleeingLink = $('#anti-flee-link');
    let fleeCount = 0;
    let fleeCooldown = false;
    fleeingLink.addEventListener('pointerenter', (event) => {
        if (event.pointerType === 'touch' || fleeCooldown) return;
        fleeCooldown = true;
        fleeCount++;
        disintegrate(fleeingLink);
        const x = Math.round((Math.random() - .5) * 190);
        const y = Math.round((Math.random() - .5) * 80);
        fleeingLink.style.setProperty('--anti-flee-x', `${x}px`);
        fleeingLink.style.setProperty('--anti-flee-y', `${y}px`);
        fleeingLink.style.setProperty('--anti-flee-r', `${Math.round((Math.random() - .5) * 22)}deg`);
        toast(fleeCount % 2 ? 'PÜÜA MIND KINNI!!!' : 'HAA! VALE NUPP!');
        window.setTimeout(() => { fleeCooldown = false; }, 850);
    });
    let tapCount = 0;
    fleeingLink.addEventListener('click', (event) => {
        if (event.detail && ++tapCount % 2 === 1) {
            event.preventDefault();
            toast('ÜKS KLÕPS ON LIIGA LIHTNE! PROOVI VEEL.');
        }
    });

    // #1: settings with contradictory outcomes and gratuitous shifting layout.
    const schedule = $('.schedule-window');
    $('#anti-readability').addEventListener('input', (e) => {
        const fuzz = (+e.target.value / 100 * 3.5).toFixed(2);
        schedule.style.setProperty('--anti-fuzz', `${fuzz}px`);
        toast(+e.target.value > 60 ? 'LOETAVUS ON NÜÜD MAKSIMAALSELT HALB.' : 'MUUDATUSED SALVESTATUD (VÕIB-OLLA)');
    });
    $('#anti-stability').addEventListener('input', (e) => {
        const tilt = ((+e.target.value / 100) * 6 - .5).toFixed(2);
        schedule.style.setProperty('--anti-cant', `${tilt}deg`);
    });
    $('#anti-fix-layout').addEventListener('click', () => {
        const tilt = Math.round((Math.random() - .5) * 15);
        schedule.style.setProperty('--anti-cant', `${tilt}deg`);
        schedule.style.setProperty('--anti-fuzz', `${(.5 + Math.random() * 2).toFixed(2)}px`);
        toast('KUJUNDUS ON NÜÜD 200% PARANDATUD!');
    });
    let toggles = 0;
    $('#anti-remove-annoyances').addEventListener('click', (event) => {
        toggles++;
        event.currentTarget.textContent = toggles % 2 ? '❌ HÄIRIVAD ASJAD LISATUD!' : '🚨 EEMALDA HÄIRIVAD ASJAD';
        toast('Sinu soov eemaldada segajad on tühistatud.');
        $('#anti-ad').hidden = false;
    });

    // Unclosable-looking ad; actually closes after a couple of intentional steps.
    let closeTries = 0;
    const ad = $('#anti-ad');
    $('#anti-close-ad').addEventListener('click', (event) => {
        closeTries++;
        if (closeTries < 3) {
            event.currentTarget.textContent = `❌ EI SULGUNUD (${closeTries}/3)`;
            event.currentTarget.style.transform = `translateX(${closeTries % 2 ? -25 : 25}px)`;
            toast('SEE OLI AINULT PROOVISULGEMINE!');
        } else {
            ad.hidden = true;
            toast('REKLAAM SULETUD. NÜÜD ÄRA KUNAGI ENAM SIIA TULE.');
        }
    });

    // Clicking any timetable lesson gives unnecessary advice instead of doing something useful.
    const responses = ['INFO ON JUBA TABELIS. MIKS SA SEDA VAJUTASID?', 'KAS OLED KINDEL, ET SEE ON TUND?', 'VIGA 418: OLEN TEEKANN ☕'];
    document.querySelectorAll('.lesson').forEach((lesson) => {
        lesson.title = 'Ära klõpsa, see teeb asja hullemaks.';
        lesson.addEventListener('click', () => toast(responses[Math.floor(Math.random() * responses.length)]));
    });
})();
