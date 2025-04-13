import React from 'react';

function VideoTutorials() {
  return (
    <div className="hoome">
    <div className="faq">
      <h2>مقاطع الفيديو التعليمية</h2>
      <div>
        <h3>كيفية التسجيل وإنشاء حساب</h3>
        <p>
          شاهد هذا الفيديو لتتعلم كيفية التسجيل وإنشاء حساب جديد على الموقع.
        </p>
        <video controls>
          <source src="path/to/registration-tutorial.mp4" type="video/mp4" />
          متصفحك لا يدعم عنصر الفيديو.
        </video>
      </div>
      <div>
        <h3>كيفية الإبلاغ عن مشكلة</h3>
        <p>
          شاهد هذا الفيديو لتتعلم كيفية الإبلاغ عن مشكلة جديدة على الموقع.
        </p>
        <video controls>
          <source src="path/to/reporting-tutorial.mp4" type="video/mp4" />
          متصفحك لا يدعم عنصر الفيديو.
        </video>
      </div>
      <div>
        <h3>كيفية متابعة حالة البلاغ</h3>
        <p>
          شاهد هذا الفيديو لتتعلم كيفية متابعة حالة البلاغات التي قمت بتقديمها.
        </p>
        <video controls>
          <source src="path/to/status-tutorial.mp4" type="video/mp4" />
          متصفحك لا يدعم عنصر الفيديو.
        </video>
      </div>
      <div>
        <h3>كيفية تعديل معلومات الحساب</h3>
        <p>
          شاهد هذا الفيديو لتتعلم كيفية تعديل معلومات حسابك الشخصي.
        </p>
        <video controls>
          <source src="path/to/edit-account-tutorial.mp4" type="video/mp4" />
          متصفحك لا يدعم عنصر الفيديو.
        </video>
      </div>
    </div>
    </div>
  );
}

export default VideoTutorials;
