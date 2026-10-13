# Security policy

## Dependency remediation (2026-10-13)

The maintained branch uses Expo SDK 57 and its matching native modules. Axios has been removed in favor of built-in fetch over HTTPS. The lockfile records the tested dependency tree. Weekly Dependabot updates are configured.

The xcode dependency is overridden to uuid ^11.1.1 to address GHSA-w5hq-g745-h8pq. Its CommonJS v4 API, used by xcode to generate project IDs, has been checked for compatibility.

## Remaining upstream advisories

The npm audit performed on 2026-10-13 reports 15 high-severity affected dependency entries, tracing back to these two advisories (not 15 independent vulnerabilities):

- braces <=3.0.3: [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), a stack-exhaustion issue when processing deeply nested patterns. It is pulled in by the Metro toolchain.
- node-forge <=1.4.0: [GHSA-86w9-cpqp-85rv](https://github.com/advisories/GHSA-86w9-cpqp-85rv), incorrect RSA signature verification. It is pulled in by Expo CLI and its certificate tooling.

Both advisories list no patched release at the time of this update. These findings are not dismissed or hidden. Do not use npm audit fix --force: its suggested downgrade to Expo 44 would reintroduce an obsolete SDK. Re-run npm audit and review upstream releases when patches become available. Avoid processing untrusted build configuration/glob patterns or relying on the affected verification code for untrusted certificates. This does not establish that every reported path is reachable from the weather app.

## Weather service key

An OpenWeather key existed in the repository's history. The owner must revoke/rotate it at OpenWeather. Removing it from current source does not invalidate it or erase history. Configure a replacement locally using .env.example. EXPO_PUBLIC_ values are visible in client bundles; use a backend proxy if the credential needs to remain secret.

## Validation scope

The update is verified using automated request tests, Expo dependency checks, Expo Doctor, and JavaScript exports for Android, iOS, and web. Native installation, real device location permissions, and live weather with a replacement key require a device and a valid owner-provided key.
