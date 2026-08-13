  
document.querySelector('.form-panel').addEventListener('submit', async (e) => {
  e.preventDefault(); // إيقاف إعادة تحميل الصفحة

  // الإمساك بالحقول وعناصر النموذج
  const nameInput = document.getElementById('name');
  const companyInput = document.getElementById('company');
  const emailInput = document.getElementById('email');
  const msgInput = document.getElementById('msg');
  const submitBtn = e.target.querySelector('button');

  // تجميع البيانات داخل كائن مطابق للمخطط المتوقع بالباك آند
  const contactData = {
    name: nameInput.value.trim(),
    company: companyInput.value.trim() || null, // يرسل null لو كان فارغاً
    email: emailInput.value.trim(),
    message: msgInput.value.trim()
  };

  // تعديل واجهة الزر أثناء المعالجة لحماية السيرفر من النقرات المتعددة
  const originalText = submitBtn.innerText;
  submitBtn.innerText = 'جارٍ إرسال طلبك الأمني...';
  submitBtn.disabled = true;

  try {
    // إرسال طلب POST إلى خادم FastAPI المحلي
    const response = await fetch('http://127.0.0.1:8000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData)
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message); // عرض نص النجاح المستلم من خادم بايثون
      document.querySelector('.form-panel').reset(); // تصفير الحقول
    } else {
      alert('فشل حفظ البيانات: ' + (data.detail || 'يرجى التحقق من المدخلات.'));
    }
  } catch (error) {
    console.error('Network/Fetch Error:', error);
    alert('تعذر الوصول إلى نظام دِرع الأمني. تأكد من تشغيل خادم الباك آند (FastAPI) أولاً.');
  } finally {
    // إعادة الزر لوضعه الطبيعي بعد الانتهاء
    submitBtn.innerText = originalText;
    submitBtn.disabled = false;
  }
});