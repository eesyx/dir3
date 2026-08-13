  
// تأثير ظهور العناصر عند التمرير (Reveal on Scroll)
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { 
    if(entry.isIntersecting){ 
      entry.target.classList.add('in'); 
      observer.unobserve(entry.target); // تشغيل الحركة لمرة واحدة فقط
    } 
  });
}, { threshold: 0.15 });

revealElements.forEach(el => observer.observe(el));

// محاكاة سجلات الـ SOC (Live Logs Monitor)
const logFeed = document.getElementById('logFeed');
const securityEvents = [
  { text: 'محاولة اتصال مشبوهة من عنوان خارجي غير معروف', badge: 'badge-warn', status: 'تم الحظر' },
  { text: 'فحص دوري لمنافذ الشبكة الداخلية مكتمل السلبيات', badge: 'badge-ok', status: 'آمن' },
  { text: 'تم تطبيق تحديث أمني عاجل على خادم البيانات الرئيسي', badge: 'badge-ok', status: 'مكتمل' },
  { text: 'نشاط دخول غير معتاد برتبة مدير نظام تم رصده', badge: 'badge-warn', status: 'تحقيق جاري' },
  { text: 'مزامنة وتشفير النسخ الاحتياطية الاستراتيجية', badge: 'badge-info', status: 'جارٍ الآن' }
];

function padZero(num) { return num.toString().padStart(2, '0'); }
function getCurrentTime() {
  const now = new Date();
  return padZero(now.getHours()) + ':' + padZero(now.getMinutes()) + ':' + padZero(now.getSeconds());
}

function addLogLine() {
  if (!logFeed) return;
  const event = securityEvents[Math.floor(Math.random() * securityEvents.length)];
  const line = document.createElement('div');
  line.className = 'log-line';
  line.innerHTML = `
    <span class="log-time">${getCurrentTime()}</span>
    <span class="badge ${event.badge}">${event.status}</span>
    <span>${event.text}</span>
  `;
  logFeed.appendChild(line);
  
  // الاحتفاظ بآخر 6 أسطر فقط لتجنب امتلاء الشاشة
  while (logFeed.children.length > 6) { 
    logFeed.removeChild(logFeed.firstChild); 
  }
}

// بناء الأسطر الأولية وتحديثها بشكل دوري
if (logFeed) {
  for (let i = 0; i < 5; i++) addLogLine();
  setInterval(addLogLine, 2800);
}