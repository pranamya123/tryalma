import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import Leads from '../lead-form/page';
import { fetchLeads, updateLeadStatus } from '../leadsSlice';
import '@testing-library/jest-dom/extend-expect';
import { useRouter } from 'next/navigation';

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('Leads Component', () => {
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn(),
        });
    });

    it('renders loading state', () => {
        render(
            <Provider store={store}>
                <Leads />
            </Provider>
        );
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('fetches and displays leads', async () => {
        const mockLeads = [
            {
                id: '1',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                linkedin: 'linkedin.com/in/johndoe',
                visas: 'H1B',
                resume: { name: 'resume.pdf' },
                message: 'Interested in job',
                state: 'Pending',
                createdAt: new Date().toISOString(),
                country: 'USA'
            },
            {
                id: '2',
                firstName: 'Jane',
                lastName: 'Smith',
                email: 'jane.smith@example.com',
                linkedin: 'linkedin.com/in/janesmith',
                visas: 'H1B',
                resume: { name: 'resume.pdf' },
                message: 'Looking for opportunity',
                state: 'Reached Out',
                createdAt: new Date().toISOString(),
                country: 'Canada'
            }
        ];

        // Mock the fetchLeads async thunk to resolve with the mock leads
        jest.spyOn(store, 'dispatch').mockImplementation((action) => {
            if (action.type === fetchLeads.pending.type) {
                return store.dispatch(action);
            }
            if (action.type === fetchLeads.fulfilled.type) {
                return store.dispatch({ ...action, payload: mockLeads });
            }
            return store.dispatch(action);
        });

        render(
            <Provider store={store}>
                <Leads />
            </Provider>
        );

        // Wait for the leads to load
        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        });
    });

    it('updates lead status when button is clicked', async () => {
        const mockLeads = [
            {
                id: '1',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                linkedin: 'linkedin.com/in/johndoe',
                visas: 'H1B',
                resume: { name: 'resume.pdf' },
                message: 'Interested in job',
                state: 'Pending',
                createdAt: new Date().toISOString(),
                country: 'USA'
            }
        ];

        // Mock the fetchLeads async thunk to resolve with the mock leads
        jest.spyOn(store, 'dispatch').mockImplementation((action) => {
            if (action.type === fetchLeads.pending.type) {
                return store.dispatch(action);
            }
            if (action.type === fetchLeads.fulfilled.type) {
                return store.dispatch({ ...action, payload: mockLeads });
            }
            if (action.type === updateLeadStatus.fulfilled.type) {
                return store.dispatch({ ...action, payload: '1' });
            }
            return store.dispatch(action);
        });

        render(
            <Provider store={store}>
                <Leads />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Mark as Reached Out' })).toBeInTheDocument();
        });

        fireEvent.click(screen.getByRole('button', { name: 'Mark as Reached Out' }));

        // Assert that the updateLeadStatus thunk was dispatched
        expect(store.dispatch).toHaveBeenCalledWith(updateLeadStatus('1'));
    });
});
