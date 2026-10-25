import { useState } from 'react';
import './dashboard.css';

const initialTasks = [
  { id: 1, title: 'Plan the week ahead', detail: 'Add your priorities for the week', done: true },
  { id: 2, title: 'Finish the design draft', detail: 'Review the last few details', done: false },
  { id: 3, title: 'Take a little break', detail: 'A moment for yourself matters, too', done: false },
];

function Icon({ name, size = 19 }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    heart: <path d="M20.8 8.8c0 5.1-8.8 10.2-8.8 10.2S3.2 13.9 3.2 8.8A4.7 4.7 0 0 1 12 6.5a4.7 4.7 0 0 1 8.8 2.3Z"/>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.1 1.8-1.8 3.1-2.1-.5a8 8 0 0 1-1.7 1l-.5 2.1h-3.6l-.5-2.1a8 8 0 0 1-1.7-1l-2.1.5-1.8-3.1L5 15a8 8 0 0 1 0-2l-1.2-1.8 1.8-3.1 2.1.5a8 8 0 0 1 1.7-1l.5-2.1h3.6l.5 2.1a8 8 0 0 1 1.7 1l2.1-.5 1.8 3.1L19.4 13a8 8 0 0 1 0 2Z" transform="translate(0 -1) scale(1 .95)"/></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6"/>,
    plus: <path d="M12 5v14M5 12h14"/>,
    check: <path d="m5 12 4 4L19 6"/>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export default function Dashboard({ userName = 'Jamie', onLogout }) {
  const [activeNav, setActiveNav] = useState('Overview');
  const [tasks, setTasks] = useState(initialTasks);
  const [showNotice, setShowNotice] = useState(false);
  const completed = tasks.filter((task) => task.done).length;

  const navItems = [
    { label: 'Overview', icon: 'grid' },
    { label: 'My calendar', icon: 'calendar' },
    { label: 'My favorites', icon: 'heart' },
    { label: 'Settings', icon: 'settings' },
  ];

  function toggleTask(id) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, done: !task.done } : task));
  }

  return (
    <main className="dash-page">
      <aside className="dash-sidebar">
        <a className="dash-brand" href="#overview" onClick={() => setActiveNav('Overview')} aria-label="Petal home">
          <span className="dash-brand-icon">♡</span><span>petal<span className="brand-dot">.</span></span>
        </a>
        <div className="sidebar-caption">WORKSPACE</div>
        <nav className="dash-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button key={item.label} type="button" className={`dash-nav-item ${activeNav === item.label ? 'selected' : ''}`} onClick={() => setActiveNav(item.label)}>
              <Icon name={item.icon} /><span>{item.label}</span>{item.label === 'My calendar' && <span className="nav-count">3</span>}
            </button>
          ))}
        </nav>
        {onLogout && <button type="button" className="dash-nav-item" onClick={onLogout} style={{ marginTop: 10, color: '#a34b70' }}><span aria-hidden="true">↪</span><span>Log out</span></button>}
        <div className="sidebar-note">
          <div className="note-flower">✿</div>
          <h3>A little reminder</h3>
          <p>You don't have to do everything today. One small step is still progress.</p>
          <span>TAKE IT GENTLY ♡</span>
        </div>
        <button className="sidebar-profile" type="button" onClick={() => setShowNotice(true)}>
          <span className="avatar avatar-small">{userName.charAt(0).toUpperCase()}</span>
          <span className="profile-copy"><strong>{userName}</strong><small>Personal workspace</small></span>
          <span className="profile-dots">···</span>
        </button>
      </aside>

      <section className="dash-main" id="overview">
        <header className="dash-topbar">
          <div className="mobile-brand"><span className="dash-brand-icon">♡</span> petal<span className="brand-dot">.</span></div>
          <div className="breadcrumb">Workspace <span>/</span> <strong>{activeNav}</strong></div>
          <div className="topbar-actions">
            <label className="dash-search"><Icon name="search" size={17}/><input aria-label="Search" placeholder="Search anything..." onChange={() => {}} /></label>
            <button type="button" className="icon-button notification-button" aria-label="Notifications" onClick={() => setShowNotice((value) => !value)}><Icon name="bell"/><i /></button>
            <button type="button" className="avatar top-avatar" aria-label="Open profile" onClick={() => setShowNotice(true)}>{userName.charAt(0).toUpperCase()}</button>
          </div>
        </header>

        <div className="dash-content">
          <section className="dash-heading-row">
            <div>
              <p className="dash-eyebrow">SUNDAY, OCTOBER 25, 2026</p>
              <h1>{activeNav === 'Overview' ? `Good afternoon, ${userName}` : activeNav}<span className="heading-heart"> ♡</span></h1>
              <p className="dash-subtitle">A fresh little start, at your own pace.</p>
            </div>
            <button className="pink-button" type="button" onClick={() => { setTasks((current) => [...current, { id: Date.now(), title: 'A new little goal', detail: 'Make it small and achievable', done: false }]); setShowNotice(false); }}><Icon name="plus" size={17}/> Add a task</button>
          </section>

          <section className="welcome-banner">
            <div className="banner-copy"><span className="banner-kicker">YOUR SPACE, YOUR PACE</span><h2>Make room for<br/><em>what matters.</em></h2><p>Little by little, a little becomes a lot.</p><button type="button" onClick={() => document.getElementById('today-tasks')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>See today's plan <Icon name="arrow" size={16}/></button></div>
            <div className="banner-art" aria-hidden="true"><div className="banner-circle circle-back"/><div className="banner-circle circle-front"/><div className="banner-flower">✿</div><span className="banner-spark spark-a">✦</span><span className="banner-spark spark-b">✧</span><span className="banner-heart">♡</span></div>
          </section>

          <section className="stats-grid" aria-label="Your overview">
            <article className="stat-card"><div className="stat-top"><span className="stat-icon blush"><Icon name="check"/></span><span className="stat-trend">THIS WEEK</span></div><strong className="stat-number">{completed}<span>/{tasks.length}</span></strong><p>Tasks completed</p><div className="progress-track"><span style={{ width: `${tasks.length ? (completed / tasks.length) * 100 : 0}%` }}/></div></article>
            <article className="stat-card"><div className="stat-top"><span className="stat-icon lavender">♡</span><span className="stat-trend">KEEP GOING</span></div><strong className="stat-number">4 <span>days</span></strong><p>Your current streak</p><div className="mini-week" aria-label="Weekly activity"><i/><i/><i/><i/><i/><i/><i/></div></article>
            <article className="stat-card"><div className="stat-top"><span className="stat-icon peach">✿</span><span className="stat-trend">JUST FOR YOU</span></div><strong className="stat-number">1 <span>hour</span></strong><p>Time set aside for you</p><div className="stat-footnote">A little breathing room is good. ♡</div></article>
          </section>

          <section className="dash-lower-grid">
            <article className="panel task-panel" id="today-tasks">
              <div className="panel-heading"><div><p className="panel-eyebrow">MAKE IT MANAGEABLE</p><h2>Today's little goals</h2></div><button type="button" className="subtle-link" onClick={() => setTasks((current) => current.map((task) => ({ ...task, done: false })))}>Reset list</button></div>
              <div className="task-list">{tasks.map((task) => <label key={task.id} className={`task-row ${task.done ? 'task-done' : ''}`}><input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)}/><span className="task-check"><Icon name="check" size={14}/></span><span className="task-text"><strong>{task.title}</strong><small>{task.detail}</small></span><span className="task-status">{task.done ? 'Done' : 'To do'}</span></label>)}</div>
              <div className="task-footer"><span>{completed} of {tasks.length} complete</span><span className="footer-hearts">♡ ♡ ♡</span></div>
            </article>

            <article className="panel agenda-panel">
              <div className="panel-heading"><div><p className="panel-eyebrow">SAVE A LITTLE TIME</p><h2>Coming up</h2></div><button type="button" className="round-plus" aria-label="Add an event" onClick={() => setShowNotice(true)}><Icon name="plus" size={17}/></button></div>
              <div className="agenda-date"><span className="date-day">26</span><span><strong>Monday</strong><small>October · Tomorrow</small></span></div>
              <div className="agenda-item"><span className="agenda-line pink-line"/><div><strong>Weekly planning</strong><small>9:00 AM – 9:30 AM</small></div><span className="agenda-dot pink-dot"/></div>
              <div className="agenda-item"><span className="agenda-line purple-line"/><div><strong>Creative focus time</strong><small>2:00 PM – 3:00 PM</small></div><span className="agenda-dot purple-dot"/></div>
              <button className="agenda-link" type="button" onClick={() => setActiveNav('My calendar')}>View calendar <Icon name="arrow" size={15}/></button>
            </article>
          </section>
          <footer className="dash-footer">A gentle reminder: you're doing better than you think. <span>♡</span></footer>
        </div>
      </section>

      {showNotice && <div className="notice-backdrop" role="presentation" onClick={() => setShowNotice(false)}><section className="notice-modal" role="dialog" aria-modal="true" aria-labelledby="notice-title" onClick={(event) => event.stopPropagation()}><button type="button" className="notice-close" onClick={() => setShowNotice(false)} aria-label="Close">×</button><span className="notice-icon">♡</span><h2 id="notice-title">You're all caught up!</h2><p>This is a sample dashboard interaction. Connect your own profile, notifications, calendar, or task API whenever you're ready.</p><button className="pink-button" type="button" onClick={() => setShowNotice(false)}>Sounds lovely</button></section></div>}
    </main>
  );
}
