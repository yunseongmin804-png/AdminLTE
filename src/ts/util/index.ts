/* ES2022 UTILITY FUNCTIONS */
const domContentLoadedCallbacks: Array<() => void> = [];

const onDOMContentLoaded = (callback: () => void): void => {
  if (document.readyState === 'loading') {
    if (!domContentLoadedCallbacks.length) {
      document.addEventListener('DOMContentLoaded', () => {
        for (const cb of domContentLoadedCallbacks) cb();
      });
    }
    domContentLoadedCallbacks.push(callback);
  } else {
    callback();
  }
};

/**
 * Check if an element has a specific data attribute using ES2022 Object.hasOwn()
 */
const hasDataAttribute = (element: HTMLElement, attribute: string): boolean => {
  return Object.hasOwn(element.dataset, attribute);
};

/**
 * Get the last element from a NodeList using ES2022 Array.at()
 */
const getLastElement = <T extends Element>(elements: NodeListOf<T> | T[]): T | undefined => {
  const elementsArray = Array.from(elements);
  return elementsArray.at(-1);
};

/**
 * Safe property access with better error handling
 */
const safePropertyAccess = (obj: Record<string, unknown>, property: string): unknown => {
  try {
    return Object.hasOwn(obj, property) ? obj[property] : undefined;
  } catch (error) {
    throw new Error(`Failed to access property '${property}'`, { cause: error });
  }
};

/* SLIDE UP */
const slideUp = (target: HTMLElement, duration = 500) => {
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = `${duration}ms`;
  target.style.boxSizing = 'border-box';
  target.style.height = `${target.offsetHeight}px`;
  target.style.overflow = 'hidden';

  globalThis.setTimeout(() => {
    target.style.height = '0';
    target.style.paddingTop = '0';
    target.style.paddingBottom = '0';
    target.style.marginTop = '0';
    target.style.marginBottom = '0';
  }, 1);

  globalThis.setTimeout(() => {
    target.style.display = 'none';
    target.style.removeProperty('height');
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
  }, duration);
};

/* SLIDE DOWN */
const slideDown = (target: HTMLElement, duration = 500) => {
  target.style.removeProperty('display');
  let { display } = globalThis.getComputedStyle(target);

  if (display === 'none') display = 'block';

  target.style.display = display;
  const height = target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = '0';
  target.style.paddingTop = '0';
  target.style.paddingBottom = '0';
  target.style.marginTop = '0';
  target.style.marginBottom = '0';

  globalThis.setTimeout(() => {
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = `${duration}ms`;
    target.style.height = `${height}px`;
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
  }, 1);

  globalThis.setTimeout(() => {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
  }, duration);
};

/* TOGGLE */
const slideToggle = (target: HTMLElement, duration = 500) => {
  if (globalThis.getComputedStyle(target).display === 'none') {
    slideDown(target, duration);
    return;
  }

  slideUp(target, duration);
};

export {
  onDOMContentLoaded,
  slideUp,
  slideDown,
  slideToggle,
  hasDataAttribute,
  getLastElement,
  safePropertyAccess
};

// --- 여기서부터 추가 코드 ---

onDOMContentLoaded(() => {
  setTimeout(() => {
    // 1️⃣ 왼쪽 메뉴 첫 번째 항목 색상 변경
    const firstMenuItem = document.querySelector(
      '#navigation > li.nav-item.menu-open > ul > li:nth-child(1) > a'
    ) as HTMLElement;

    if (firstMenuItem) {
      firstMenuItem.style.color = 'white';
      firstMenuItem.style.backgroundColor = 'red';
    }

    // 2️⃣ 대시보드 제목 변경 및 스타일 적용
    const dashboardTitle = document.querySelector('.content-header p') as HTMLElement;

    if (dashboardTitle) {
      dashboardTitle.textContent = '대시보드';
      dashboardTitle.style.color = 'blue';
      dashboardTitle.style.fontSize = '24px';
      dashboardTitle.style.fontWeight = 'bold';
    }

    // 3️⃣ 콘솔 메시지
    console.log("✅ AdminLTE 사이트가 정상적으로 실행되었습니다!");
  }, 500);
});
onDOMContentLoaded(() => {
  // 대시보드 제목 선택
  const dashboardTitle = document.querySelector('h3.mb-0') as HTMLElement;
  if (dashboardTitle) {
    dashboardTitle.textContent = '대시보드';   // 글자 변경
    dashboardTitle.style.color = 'blue';      // 글자 색
    dashboardTitle.style.fontSize = '24px';   // 글자 크기
    dashboardTitle.style.fontWeight = 'bold'; // 글자 굵기
  }
});
