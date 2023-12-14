import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import { Header } from './components/Header.jsx';
import { Settings } from './pages/Settings';
import { Home } from './pages/Home';
import { NotFound } from './pages/_404.jsx';
import './style.css';
import './themes/main.css';
import './i18n';

export function App() {
	return (
		<LocationProvider>
			<div class="flex flex-col h-screen">
			<Header />
				<div class="flex-1 bg-primary">
					<main class="h-full">
						<Router>
							<Route path="/" component={Home} />
							<Route path="/settings" component={Settings} />
							<Route default component={NotFound} />
						</Router>
					</main>
				</div>
			</div>
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));
