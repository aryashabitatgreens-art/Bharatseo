import React, { useState } from 'react';
import { Job, JobApplication } from '../types';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Upload, 
  CheckCircle2, 
  Sparkles, 
  X, 
  Send,
  FileText,
  User,
  Mail,
  Phone
} from 'lucide-react';

interface CareerProps {
  jobs: Job[];
  onApplySuccess: () => void;
}

export const Career: React.FC<CareerProps> = ({ jobs, onApplySuccess }) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form State
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [resumeName, setResumeName] = useState('bharat_seo_resume.pdf');
  const [coverMessage, setCoverMessage] = useState('');

  const openApplyForJob = (job: Job) => {
    setSelectedJob(job);
    setSubmittedSuccess(false);
    setApplyModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeName(e.target.files[0].name);
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_id: selectedJob.id,
          job_title: selectedJob.title,
          name: applicantName,
          email: applicantEmail,
          phone: applicantPhone,
          resume_filename: resumeName,
          cover_message: coverMessage
        })
      });

      if (res.ok) {
        setSubmittedSuccess(true);
        onApplySuccess();
        setTimeout(() => {
          setApplyModalOpen(false);
          setApplicantName('');
          setApplicantEmail('');
          setApplicantPhone('');
          setCoverMessage('');
        }, 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] text-slate-800 min-h-screen py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF9933]/15 border border-[#FF9933]/30 text-[#FF9933] text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-[#FF9933]" />
          <span>We are Hiring Top Talent</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#1A237E] tracking-tight">
          Join the Bharat SEO Team
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Build your career with India's fastest growing digital agency. We offer competitive stipends, continuous learning, and hybrid/remote work flexibility.
        </p>
      </div>

      {/* Open Job Positions List */}
      <div className="max-w-5xl mx-auto space-y-6">
        <h2 className="text-2xl font-black text-[#1A237E] flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-[#FF9933]" />
          <span>Open Positions ({jobs.length})</span>
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 hover:border-[#FF9933]/50 transition-all shadow-sm space-y-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
            >
              <div className="space-y-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-3 py-1 rounded-full bg-[#FF9933]/15 text-[#FF9933] font-bold">
                    {job.department}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {job.location}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {job.type}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-[#1A237E]">{job.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {job.description}
                </p>

                <div className="pt-2">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Key Requirements:</p>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {job.requirements.slice(0, 2).map((req, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => openApplyForJob(job)}
                className="w-full lg:w-auto px-6 py-3 rounded-full bg-[#FF9933] hover:bg-orange-600 text-white font-bold text-xs transition shadow-sm shrink-0"
              >
                Apply for Position
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Application Submission Modal */}
      {applyModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200/80 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-xl relative animate-fadeIn">
            <button
              onClick={() => setApplyModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700"
            >
              <X className="w-6 h-6" />
            </button>

            <div>
              <span className="text-xs font-bold text-[#FF9933] uppercase tracking-wider">Job Application</span>
              <h2 className="text-2xl font-black text-[#1A237E]">{selectedJob.title}</h2>
              <p className="text-xs text-slate-500">{selectedJob.department} • {selectedJob.location} ({selectedJob.type})</p>
            </div>

            {submittedSuccess ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h3 className="text-lg font-bold text-[#1A237E]">Application Submitted!</h3>
                <p className="text-xs text-slate-600">
                  Thank you, <span className="font-bold text-[#1A237E]">{applicantName}</span>. Our HR team will review your application and contact you via phone or email soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Verma"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF9933]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Email Address *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="rahul@gmail.com"
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF9933]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Phone Number *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 95208 68276"
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF9933]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Resume / CV (PDF) *</label>
                  <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-300 text-center space-y-2 cursor-pointer relative hover:border-[#FF9933] transition">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Upload className="w-6 h-6 text-[#FF9933] mx-auto" />
                    <p className="text-xs font-semibold text-slate-700">
                      {resumeName ? `Selected: ${resumeName}` : 'Click to select PDF or Doc file'}
                    </p>
                    <p className="text-[10px] text-slate-500">Max size 5MB (PDF/DOC)</p>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Cover Note / Why you?</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your experience and availability..."
                    value={coverMessage}
                    onChange={(e) => setCoverMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF9933]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-full bg-[#FF9933] hover:bg-orange-600 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Submitting Application...' : 'Submit Job Application'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
