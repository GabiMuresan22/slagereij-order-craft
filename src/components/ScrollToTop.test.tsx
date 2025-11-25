import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

describe('ScrollToTop', () => {
  beforeEach(() => {
    // Reset scroll position before each test
    window.scrollTo(0, 0);
  });

  it('scrolls to top when route changes', () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    const TestNavigator = () => {
      const navigate = useNavigate();
      return (
        <div>
          <button onClick={() => navigate('/page1')}>Go to Page 1</button>
          <button onClick={() => navigate('/page2')}>Go to Page 2</button>
        </div>
      );
    };

    const { getByText } = render(
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<TestNavigator />} />
          <Route path="/page1" element={<div>Page 1</div>} />
          <Route path="/page2" element={<div>Page 2</div>} />
        </Routes>
      </BrowserRouter>
    );

    // Simulate navigation
    const button = getByText('Go to Page 1');
    button.click();

    // Verify scrollTo was called with 0, 0
    expect(scrollToMock).toHaveBeenCalledWith(0, 0);
  });

  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <ScrollToTop />
      </BrowserRouter>
    );
  });

  it('returns null (renders nothing)', () => {
    const { container } = render(
      <BrowserRouter>
        <ScrollToTop />
      </BrowserRouter>
    );
    
    expect(container.firstChild).toBeNull();
  });
});
