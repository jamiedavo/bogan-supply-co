# Bogan.co.nz — Bogan Supply Co.

A responsive clothing storefront based on the original Bogan Supply Co. project. Includes a homepage, men's/women's/kids' collections, style filters, colour previews, size selection and a persistent sample bag.

## Run and build

- npm ci
- npm run dev
- npm run build

The production build exports static HTML, CSS and JavaScript to out/. Webpack is selected because the Turbopack CSS worker fails on this Windows environment. Deploy the contents of out/ with directory indexes enabled.

## Brand direction

Black, cream and red, large Anton wordmark and Archivo body text. Copy draws on the supplied Bogan.co.nz brand discussion: Nice things for rough units; Different culture. Same pride.

## Current launch state

This is a store preview. All six product listings, prices, available sizes and SVG garment designs are concepts. No real stock, payment provider, shipping service or customer signup is connected. The bag is stored only in the visitor's browser. No customer information is collected.

Before opening orders, supply approved product photography/artwork, confirmed prices and variants, garment measurements, contact details, fulfilment and returns information. Choose a commerce/payment provider and connect authoritative stock, checkout and order handling. Set up the domain with the chosen host; no DNS changes have been made.

## Source and hosting

Original repository: https://github.com/jamiedavo/bogan-supply-co
Private preview hosting identity is recorded in .openai/hosting.json. Preserve that identity when updating the preview.

## Verification

Production static export passes. Browser checks cover size validation, separate colour/size bag lines, quantity totals, persistence after refresh, collection/style filtering and phone menu navigation. Dependencies were upgraded from the original Next.js 14/React 18 base; the installation audit reported zero known vulnerabilities.
