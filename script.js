// ข้อมูลตารางออกกำลังกาย
const scheduleData = [
    {
        day: "วันจันทร์",
        title: "หลัง",

        exercises: [
            { name: "Lat Pulldown", detail: "4 เซต x 10–12 ครั้ง", focus: "หลังปีก", videoId: "5s6KGLTMgoI" },
            { name: "Straight-Arm Pulldown", detail: "3 เซต x 12 ครั้ง", focus: "หลังล่าง / ปีก", videoId: "lnec6DdscJU" },
            { name: "Dumbbell Row", detail: "3 เซต x 10 ครั้ง/ข้าง", focus: "หลังกลาง", videoId: "yHqqGd0tXcw" }
        ]
    },
    {
        day: "วันอังคาร",
        title: "อก",
        exercises: [
            { name: "Chest Press", detail: "4 เซต x 12 ครั้ง", focus: "หน้าอก", videoId: "QoK0kbtKWH0" }, // ตัวอย่าง ID ยูทูป
            { name: "Pec Deck / Fly", detail: "4 เซต x 10–12 ครั้ง", focus: "กลางอก", videoId: "a9vQ_hwIksU" },
            { name: "Dumbbell Press", detail: "3 เซต x 10 ครั้ง", focus: "อก", videoId: "WbCEvFA0NJs" }
        ]
    },
    {
        day: "วันพุธ",
        title: "แขน",
        exercises: [
            { name: "Triceps Pushdown", detail: "4 เซต x 12 ครั้ง", focus: "แขนหลัง", videoId: null },
            { name: "Dumbbell Overhead Extension", detail: "3 เซต x 10 ครั้ง", focus: "แขนหลัง", videoId: null },
            { name: "Biceps Curl (Cable)", detail: "4 เซต x 12 ครั้ง", focus: "แขนหน้า", videoId: null },
            { name: "Dumbbell Curl", detail: "3 เซต x 10 ครั้ง", focus: "แขนหน้า", videoId: null }
        ]
    },
    {
        day: "วันพฤหัส",
        title: "หน้าท้อง",
        exercises: [
            { name: "Ab Crunch", detail: "4 เซต x 15 ครั้ง", focus: "หน้าท้องบน", videoId: null },
            { name: "Knee Raise", detail: "4 เซต x 12 ครั้ง", focus: "หน้าท้องล่าง", videoId: null },
            { name: "Cable Crunch", detail: "3 เซต x 12 ครั้ง", focus: "กลางท้อง", videoId: null }
        ]
    },
    {
        day: "วันศุกร์",
        title: "รวมเบาๆ",
        exercises: [
            { name: "Chest Press", detail: "3 เซต x 12 ครั้ง", focus: "", videoId: null },
            { name: "Lat Pulldown", detail: "3 เซต x 12 ครั้ง", focus: "", videoId: null },
            { name: "Pec Deck", detail: "3 เซต x 12 ครั้ง", focus: "", videoId: null },
            { name: "Plank", detail: "3 เซต x 40 วินาที", focus: "", videoId: null }
        ]
    }
];

// ฟังก์ชันสำหรับสร้าง HTML จากข้อมูล
function renderSchedule() {
    const container = document.getElementById('schedule-container');
    container.innerHTML = ''; // เคลียร์ของเก่า

    scheduleData.forEach(day => {
        const card = document.createElement('div');
        card.className = 'day-card';

        let exercisesHtml = '';
        day.exercises.forEach(ex => {
            // ถ้าไม่มี videoId ให้สร้างลิงก์ค้นหา YouTube แทน
            const videoAction = ex.videoId
                ? `playVideo('${ex.videoId}', '${ex.name}')`
                : `searchVideo('${ex.name}')`;

            exercisesHtml += `
                <div class="exercise-item">
                    <div class="ex-info">
                        <h4>${ex.name}</h4>
                        <div class="ex-details">${ex.detail}</div>
                        ${ex.focus ? `<div class="focus-point">โฟกัส: ${ex.focus}</div>` : ''}
                    </div>
                    <button class="btn-video" onclick="${videoAction}">
                        🎥 ดูวิธีทำ
                    </button>
                </div>
            `;
        });

        card.innerHTML = `
            <div class="day-header">
                <h2>${day.day}</h2>
                <span>${day.title}</span>
            </div>
            <div class="exercise-list">
                ${exercisesHtml}
            </div>
        `;

        container.appendChild(card);
    });
}

// Modal Logic
const modal = document.getElementById("videoModal");
const span = document.getElementsByClassName("close")[0];
const iframe = document.getElementById("videoFrame");
const modalTitle = document.getElementById("modalTitle");

// ฟังก์ชันเล่นวิดีโอ (ถ้ามี ID)
window.playVideo = function (videoId, title) {
    modal.style.display = "flex";
    modalTitle.innerText = title;
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}

// ฟังก์ชันค้นหาวิดีโอ (ถ้าไม่มี ID)
window.searchVideo = function (term) {
    // เปิดหน้าต่างใหม่ไปที่ YouTube Search
    const query = encodeURIComponent(term + " exercise form");
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
}

// ปิด Modal
span.onclick = function () {
    modal.style.display = "none";
    iframe.src = ""; // หยุดวิดีโอ
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        iframe.src = "";
    }
}

// เริ่มทำงาน
renderSchedule();
