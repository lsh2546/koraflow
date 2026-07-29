"use client";

import { FormEvent, useMemo, useState } from "react";

type RequestStatus = "Pending" | "Approved" | "Needs review";

type RequestItem = {
  id: string;
  title: string;
  requester: string;
  amount: number;
  category: string;
  status: RequestStatus;
  step: number;
  created: string;
};

const seedRequests: RequestItem[] = [
  { id: "REQ-024", title: "Science lab supplies", requester: "Amara Okafor", amount: 1840, category: "Supplies", status: "Pending", step: 2, created: "12 min ago" },
  { id: "REQ-023", title: "Teacher training workshop", requester: "Kwame Mensah", amount: 950, category: "Training", status: "Needs review", step: 1, created: "48 min ago" },
  { id: "REQ-022", title: "Internet service renewal", requester: "Zainab Bello", amount: 420, category: "Operations", status: "Approved", step: 3, created: "2 hr ago" },
  { id: "REQ-021", title: "Library reading kits", requester: "Chidi Eze", amount: 675, category: "Supplies", status: "Approved", step: 3, created: "Yesterday" },
];

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function Home() {
  const [requests, setRequests] = useState(seedRequests);
  const [active, setActive] = useState("Overview");
  const [selected, setSelected] = useState<RequestItem | null>(seedRequests[0]);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState("");

  const stats = useMemo(() => ({
    pending: requests.filter((item) => item.status !== "Approved").length,
    approved: requests.filter((item) => item.status === "Approved").reduce((sum, item) => sum + item.amount, 0),
    saved: requests.filter((item) => item.status === "Approved").length * 4.5,
  }), [requests]);

  function flash(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const next: RequestItem = {
      id: `REQ-${String(25 + requests.length).padStart(3, "0")}`,
      title: String(form.get("title")),
      requester: String(form.get("requester")),
      amount: Number(form.get("amount")),
      category: String(form.get("category")),
      status: "Pending",
      step: 1,
      created: "Just now",
    };
    setRequests([next, ...requests]);
    setSelected(next);
    setShowForm(false);
    flash("Request routed to the right approver");
  }

  function approve(id: string) {
    setRequests((items) => items.map((item) => item.id === id ? { ...item, status: "Approved", step: 3 } : item));
    setSelected((item) => item?.id === id ? { ...item, status: "Approved", step: 3 } : item);
    flash("Approved ??requester notified automatically");
  }

  return (
    <main>
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">K</span><span>KoraFlow</span></div>
        <nav>
          {["Overview", "Requests", "Workflows", "Team"].map((item) => (
            <button key={item} onClick={() => setActive(item)} className={active === item ? "nav-active" : ""}>
              <span className="nav-icon">{item === "Overview" ? "?? : item === "Requests" ? "?? : item === "Workflows" ? "?? : "??}</span>
              {item}
              {item === "Requests" && <small>{stats.pending}</small>}
            </button>
          ))}
        </nav>
        <div className="sidebar-card">
          <div className="spark">??/div>
          <strong>Built for growing schools</strong>
          <p>Simple approvals. Clear accountability. Less admin.</p>
        </div>
        <div className="profile">
          <div className="avatar">AO</div>
          <div><strong>Ada Okoye</strong><span>School administrator</span></div>
          <button aria-label="Open profile menu">?™™?/button>
        </div>
      </aside>

      <section className="workspace">
        <header>
          <div>
            <p className="eyebrow">WEDNESDAY, 29 JULY</p>
            <h1>Good afternoon, Ada.</h1>
            <p>Here?셲 what needs your attention today.</p>
          </div>
          <div className="header-actions">
            <button className="icon-button" aria-label="Notifications">??i /></button>
            <button className="primary" onClick={() => setShowForm(true)}><span>竊?/span> New request</button>
          </div>
        </header>

        <section className="stats">
          <article>
            <div className="stat-icon amber">??/div>
            <div><span>Awaiting action</span><strong>{stats.pending}</strong><small>Across 2 workflows</small></div>
            <b>View ??/b>
          </article>
          <article>
            <div className="stat-icon green">??/div>
            <div><span>Approved this month</span><strong>{money.format(stats.approved)}</strong><small>4 requests completed</small></div>
            <em>??18%</em>
          </article>
          <article>
            <div className="stat-icon blue">??/div>
            <div><span>Admin time saved</span><strong>{stats.saved}h</strong><small>Estimated this month</small></div>
            <b>Nice work</b>
          </article>
        </section>

        <section className="content-grid">
          <div className="panel requests-panel">
            <div className="panel-heading">
              <div><h2>Requests needing attention</h2><p>Review and keep work moving.</p></div>
              <button onClick={() => setActive("Requests")}>View all</button>
            </div>
            <div className="request-list">
              {requests.slice(0, 4).map((item) => (
                <button className={`request-row ${selected?.id === item.id ? "selected" : ""}`} key={item.id} onClick={() => setSelected(item)}>
                  <span className={`category-icon ${item.category.toLowerCase()}`}>{item.category === "Training" ? "?? : item.category === "Operations" ? "?? : "??}</span>
                  <span className="request-main"><strong>{item.title}</strong><small>{item.id} 쨌 {item.requester}</small></span>
                  <span className="request-amount"><strong>{money.format(item.amount)}</strong><small>{item.created}</small></span>
                  <span className={`status ${item.status.toLowerCase().replace(" ", "-")}`}>{item.status}</span>
                  <span className="chevron">??/span>
                </button>
              ))}
            </div>
          </div>

          <div className="panel detail-panel">
            {selected && <>
              <div className="detail-top">
                <span className="detail-label">LIVE WORKFLOW</span>
                <span className={`status ${selected.status.toLowerCase().replace(" ", "-")}`}>{selected.status}</span>
              </div>
              <h2>{selected.title}</h2>
              <p>{selected.requester} 쨌 {money.format(selected.amount)}</p>
              <div className="flow">
                {["Submitted", "Review", "Complete"].map((step, index) => (
                  <div className="flow-step" key={step}>
                    <span className={index < selected.step ? "done" : ""}>{index < selected.step ? "?? : index + 1}</span>
                    <small>{step}</small>
                    {index < 2 && <i className={index + 1 < selected.step ? "done-line" : ""} />}
                  </div>
                ))}
              </div>
              <div className="rule-box"><span>??/span><div><strong>Smart routing active</strong><p>Requests over $500 require finance review.</p></div></div>
              {selected.status !== "Approved" ? (
                <div className="decision-actions">
                  <button onClick={() => flash("A clarification was requested")}>Ask a question</button>
                  <button className="approve" onClick={() => approve(selected.id)}>Approve request</button>
                </div>
              ) : <div className="complete-note">??Completed and recorded in the audit trail</div>}
            </>}
          </div>
        </section>

        <section className="bottom-grid">
          <div className="panel activity">
            <div className="panel-heading"><div><h2>Recent activity</h2><p>A live, searchable audit trail.</p></div><span className="live"><i /> LIVE</span></div>
            <div className="activity-items">
              <div><span className="mini-avatar purple">NK</span><p><strong>Ngozi approved</strong> Internet service renewal<small>8 minutes ago</small></p></div>
              <div><span className="mini-avatar peach">KM</span><p><strong>Kwame submitted</strong> Teacher training workshop<small>48 minutes ago</small></p></div>
              <div><span className="mini-avatar mint">SO</span><p><strong>System routed</strong> Science lab supplies to Finance<small>1 hour ago</small></p></div>
            </div>
          </div>
          <div className="impact-card">
            <span>MONTHLY IMPACT</span>
            <h2>Less chasing.<br />More teaching.</h2>
            <p>Your team completed 12 requests with an average decision time of 3.2 hours.</p>
            <div><strong>92%</strong><small>faster than email</small></div>
            <div className="bars"><i /><i /><i /><i /><i /><i /><i /></div>
          </div>
        </section>
      </section>

      {showForm && (
        <div className="modal-backdrop" onMouseDown={() => setShowForm(false)}>
          <form className="modal" onSubmit={submitRequest} onMouseDown={(event) => event.stopPropagation()}>
            <div className="modal-head"><div><span>NEW REQUEST</span><h2>What does your school need?</h2></div><button type="button" onClick={() => setShowForm(false)}>횞</button></div>
            <label>Request title<input name="title" placeholder="e.g. Classroom tablets" required autoFocus /></label>
            <div className="form-grid">
              <label>Requester<input name="requester" placeholder="Full name" required /></label>
              <label>Amount (USD)<input name="amount" type="number" min="1" placeholder="750" required /></label>
            </div>
            <label>Category<select name="category"><option>Supplies</option><option>Training</option><option>Operations</option></select></label>
            <div className="automation-note"><span>??/span><p><strong>KoraFlow will route this automatically.</strong><br />The right approvers are selected from amount and category.</p></div>
            <button className="primary submit" type="submit">Submit and route request ??/button>
          </form>
        </div>
      )}
      {toast && <div className="toast"><span>??/span>{toast}</div>}
    </main>
  );
}

