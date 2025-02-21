// src/app/leads/page.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { fetchLeads, updateLeadStatus, setSearchQuery, setSortBy, setSortOrder } from '../leadsSlice';

type Lead = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    linkedin: string;
    visas: string;
    resume: any;
    message: string;
    state: 'Pending' | 'Reached Out';
    createdAt: string;
    country: string;
};

// Custom hook for typed dispatch
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '../store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const Leads = () => {
    const router = useRouter();
    const leads = useAppSelector((state: RootState) => state.leads.leads);
    const searchQuery = useAppSelector((state: RootState) => state.leads.searchQuery);
    const sortBy = useAppSelector((state: RootState) => state.leads.sortBy);
    const sortOrder = useAppSelector((state: RootState) => state.leads.sortOrder);
    const leadsStatus = useAppSelector((state: RootState) => state.leads.status);
    const leadsError = useAppSelector((state: RootState) => state.leads.error);
    const dispatch = useAppDispatch();
    const [statusFilter, setStatusFilter] = useState('');

    // Authentication Check
    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn'); 
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [router]);

    // Fetch leads on component mount
    useEffect(() => {
        dispatch(fetchLeads());
    }, [dispatch]);

    const handleStatusChange = async (id: string) => {
        dispatch(updateLeadStatus(id)); // Dispatch the async thunk
    };

    const handleSort = (key: keyof Lead) => {
        dispatch(setSortBy(key));
        dispatch(setSortOrder(sortBy === key && sortOrder === 'asc' ? 'desc' : 'asc'));
    };

    const sortedLeads = useMemo(() => {
        const sorted = [...leads].sort((a, b) => {
            const order = sortOrder === 'asc' ? 1 : -1;
            if (a[sortBy] < b[sortBy]) return -order;
            if (a[sortBy] > b[sortBy]) return order;
            return 0;
        });
        return sorted;
    }, [leads, sortBy, sortOrder]);

    const filteredLeads = useMemo(() => {
        return sortedLeads.filter(lead => {
            const searchMatch = lead.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || lead.lastName.toLowerCase().includes(searchQuery.toLowerCase());
            const statusMatch = statusFilter === '' || lead.state === statusFilter;
            return searchMatch && statusMatch;
        });
    }, [sortedLeads, searchQuery, statusFilter]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    };

    if (leadsStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (leadsStatus === 'failed') {
        return <div>Error: {leadsError}</div>;
    }

    return (
        <div className="flex h-screen bg-stone-50">
            {/* Sidebar */}
            <div className="w-64 bg-neutral-100 shadow-md">
                <div className="p-4" style={{
                    background: 'radial-gradient(circle at top left, #f0f4c3 20%, transparent)', 
                    height: '120px', 
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '20px'
                }}>
                    <Image src="/alma-logo.png" alt="Alma Logo" width={80} height={24} />
                </div>
                <nav className="mt-6">
                    <a href="#" className="block py-2 px-4 text-gray-800 hover:bg-gray-200" style={{ fontWeight: '800' }}>Leads</a>
                    <a href="#" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">Settings</a>
                </nav>
                <div className="absolute bottom-0 p-4 flex items-center space-x-2">
                    <div className="rounded-full bg-gray-400 h-8 w-8 flex items-center justify-center text-black font-bold">
                        A
                    </div>
                    <div className="text-sm font-bold">Admin</div>
                </div>

            </div>

            {/* Main Content */}
            <div className="flex-1 p-4" style={{ paddingTop: '3rem' }}>
                <h1 className="text-2xl font-semibold mb-4">Leads</h1>

                {/* Search and Filter */}
                <div className="flex items-center space-x-2 mb-4">
                    <div className="relative" style={{ marginRight: '1px', width: '11%' }}>
                        <input
                            type="search"
                            placeholder="Search"
                            className="w-full p-2 border rounded text-sm"
                            value={searchQuery}
                            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                            style={{ width: '100%', borderRadius: '10px', paddingLeft: '18%' }}
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-6a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                    </div>
                    <select
                        className="p-2 border rounded text-sm"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{ width: '5%', minWidth: '100px', borderRadius: '10px' }}
                    >
                        <option value="">Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Reached Out">Reached Out</option>
                    </select>
                </div>
                {/* Lead Table */}
                <div className="bg-white shadow-md rounded-2xl overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-left text-gray-400  font-light cursor-pointer border-b border-gray-200" onClick={() => handleSort('firstName')} style={{ backgroundColor: 'white' }}>
                                    Name {sortBy === 'firstName' && (sortOrder === 'asc' ? '↓' : '↑')}
                                </th>
                                <th className="py-3 px-4 text-left text-gray-400  font-light cursor-pointer border-b border-gray-200" onClick={() => handleSort('createdAt')} style={{ backgroundColor: 'white' }}>
                                    Submitted {sortBy === 'createdAt' && (sortOrder === 'asc' ? '↓' : '↑')}
                                </th>
                                <th className="py-3 px-4 text-left text-gray-400 font-light cursor-pointer border-b border-gray-200" onClick={() => handleSort('state')} style={{ backgroundColor: 'white' }}>
                                    Status {sortBy === 'state' && (sortOrder === 'asc' ? '↓' : '↑')}
                                </th>
                                <th className="py-3 px-4 text-left text-gray-400  font-light cursor-pointer border-b border-gray-200" onClick={() => handleSort('country')} style={{ backgroundColor: 'white' }}>
                                    Country {sortBy === 'country' && (sortOrder === 'asc' ? '↓' : '↑')}
                                </th>
                                <th className="py-3 px-4 text-left text-gray-400 font-light border-b border-gray-200" style={{ backgroundColor: 'white' }}>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLeads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4 border-b border-gray-200">{lead.firstName} {lead.lastName}</td>
                                    <td className="py-3 px-4 border-b border-gray-200">{formatDate(lead.createdAt)}</td>
                                    <td className="py-3 px-4 border-b border-gray-200">{lead.state}</td>
                                    <td className="py-3 px-4 border-b border-gray-200">{lead.country}</td>
                                    <td className="py-3 px-4 border-b border-gray-200">
                                        {lead.state === 'Pending' && (
                                            <button
                                                className="text-black font-bold py-2 px-4 rounded text-sm"
                                                onClick={() => handleStatusChange(lead.id)}
                                                style={{ backgroundColor: '#f0f4c3'}}
                                            >
                                                Mark as Reached Out
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            <tr></tr>
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-end mt-4 space-x-2">
                    <button className="mx-1 px-3 py-1 rounded  hover:bg-gray-300 text-sm">&lt;</button>
                    <button className="mx-1 px-3 py-1 rounded border border-black hover:bg-gray-300 text-sm">1</button>
                    <button className="mx-1 px-3 py-1 rounded  hover:bg-gray-300 text-sm">2</button>
                    <button className="mx-1 px-3 py-1 rounded  hover:bg-gray-300 text-sm">3</button>
                    <button className="mx-1 px-3 py-1 rounded  hover:bg-gray-300 text-sm">&gt;</button>
                </div>
            </div>
        </div>
    );
};

export default Leads;
