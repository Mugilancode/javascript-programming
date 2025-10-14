const otpInputs = Array.from(document.querySelectorAll('.otp__input'));
const btnGetOtp = document.getElementById('btnGetOtp');
const btnLoginOtp = document.getElementById('btnLoginOtp');
const btnCancel = document.getElementById('btnCancel');
const resendOtp = document.getElementById('resendOtp');
const callMethod = document.getElementById('callMethod');
const otpMethod = document.getElementById('otpMethod');

/* OTP input auto navigation */
otpInputs.forEach((input, idx) => {
  input.addEventListener('input', e => {
    const val = e.target.value.replace(/\D/g, '');
    e.target.value = val;
    if (val && idx < otpInputs.length - 1) otpInputs[idx + 1].focus();
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Backspace' && !e.target.value && idx > 0) {
      otpInputs[idx - 1].focus();
    }
  });

  input.addEventListener('paste', e => {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
    if (!paste) return;
    const chars = paste.split('').slice(0, otpInputs.length);
    otpInputs.forEach((inp, i) => (inp.value = chars[i] || ''));
    otpInputs[Math.min(chars.length, otpInputs.length) - 1].focus();
  });
});

/* Switch method pill buttons */
callMethod.addEventListener('click', () => {
  callMethod.classList.add('pill--active');
  otpMethod.classList.remove('pill--active');
});
otpMethod.addEventListener('click', () => {
  otpMethod.classList.add('pill--active');
  callMethod.classList.remove('pill--active');
});

/* Simulate Send OTP */
btnGetOtp.addEventListener('click', () => {
  otpInputs[0].focus();
});

/* Simulate Verify OTP */
btnLoginOtp.addEventListener('click', () => {
  const code = otpInputs.map(i => i.value).join('');
  if (code.length < otpInputs.length) {
    alert('Please enter the full 6-digit OTP.');
    otpInputs.find(i => !i.value)?.focus();
    return;
  }
  btnLoginOtp.textContent = 'Verifying...';
  btnLoginOtp.disabled = true;
  setTimeout(() => {
    btnLoginOtp.textContent = 'Login';
    btnLoginOtp.disabled = false;
    alert('OTP verified successfully!');
    otpInputs.forEach(i => (i.value = ''));
  }, 900);
});

/* Cancel clears inputs */
btnCancel.addEventListener('click', () => {
  otpInputs.forEach(i => (i.value = ''));
});

/* Resend OTP simulation */
resendOtp.addEventListener('click', () => {
  resendOtp.textContent = 'Resent ✓';
  resendOtp.disabled = true;
  setTimeout(() => {
    resendOtp.textContent = 'Resend OTP';
    resendOtp.disabled = false;
  }, 1500);
});
