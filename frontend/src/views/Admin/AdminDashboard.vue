<template>
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="mb-0">Dashboard</h3>
        <div class="muted-small">As this is a static demo there is no live data.</div>
    </div>

    <div class="row g-3 mb-4">
        <div class="col-md-4">
            <div class="card stat text-center">
                <div class="muted-small">Total Orders</div>
                <div class="h4 mt-2">128</div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card stat text-center">
                <div class="muted-small">Revenue (YTD)</div>
                <div class="h4 mt-2">$14,520</div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card stat text-center">
                <div class="muted-small">Active Customers</div>
                <div class="h4 mt-2">342</div>
            </div>
        </div>
    </div>

    <!-- Orders list (static) -->
    <div class="card mb-4" id="orders">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="mb-0">Recent Orders</h5>
                <a class="small" href="orders.html">See all</a>
            </div>

            <div class="table-responsive">
                <table class="table table-hover align-middle">
                    <thead class="table-light">
                        <tr>
                            <th>Order</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th class="text-end">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#1009</td>
                            <td>Jane Doe</td>
                            <td>2025-11-15</td>
                            <td><span class="badge bg-success">Delivered</span></td>
                            <td class="text-end">$59.00</td>
                        </tr>
                        <tr>
                            <td>#1010</td>
                            <td>Tom Smith</td>
                            <td>2025-11-16</td>
                            <td><span class="badge bg-warning">Processing</span></td>
                            <td class="text-end">$22.00</td>
                        </tr>
                        <tr>
                            <td>#1011</td>
                            <td>Alice Lee</td>
                            <td>2025-11-17</td>
                            <td><span class="badge bg-danger">Cancelled</span></td>
                            <td class="text-end">$0.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Products preview (static) -->
    <div class="card mb-4" id="products">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="mb-0">Top Products</h5>
                <a class="small" href="products.html">Manage products</a>
            </div>

            <div class="row row-cols-1 row-cols-md-3 g-3">
                <div class="col">
                    <div class="card h-100">
                        <img src="https://placehold.co/400x260?text=Product+A" class="card-img-top" alt="Product A"
                            style="height:140px; object-fit:cover;">
                        <div class="card-body">
                            <h6 class="card-title mb-1">Product A</h6>
                            <p class="mb-0 muted-small">$22.00 • 45 sold</p>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card h-100">
                        <img src="https://placehold.co/400x260?text=Product+B" class="card-img-top" alt="Product B"
                            style="height:140px; object-fit:cover;">
                        <div class="card-body">
                            <h6 class="card-title mb-1">Product B</h6>
                            <p class="mb-0 muted-small">$32.00 • 30 sold</p>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card h-100">
                        <img src="https://placehold.co/400x260?text=Product+C" class="card-img-top" alt="Product C"
                            style="height:140px; object-fit:cover;">
                        <div class="card-body">
                            <h6 class="card-title mb-1">Product C</h6>
                            <p class="mb-0 muted-small">$42.00 • 20 sold</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Customers preview (static) -->
    <div class="card mb-4" id="customers">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="mb-0">Recent Customers</h5>
                <a class="small" href="customers.html">Manage</a>
            </div>

            <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <strong>Jane Doe</strong>
                        <div class="muted-small">jane@example.com</div>
                    </div>
                    <div class="muted-small">Joined 2025-10-01</div>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <strong>Tom Smith</strong>
                        <div class="muted-small">tom@example.com</div>
                    </div>
                    <div class="muted-small">Joined 2025-09-12</div>
                </li>
            </ul>
        </div>
    </div>

    <!-- Settings preview -->
    <div class="card" id="settings">
        <div class="card-body">
            <h5 class="card-title">Store settings</h5>
            <p class="muted-small mb-3">Basic settings are editable in the real admin panel. This static demo shows
                where settings would live.</p>

            <div class="row">
                <div class="col-md-6 mb-2">
                    <label class="form-label small">Store name</label>
                    <input class="form-control form-control-sm" value="SimpleShop Demo" readonly>
                </div>
                <div class="col-md-6 mb-2">
                    <label class="form-label small">Default currency</label>
                    <input class="form-control form-control-sm" value="USD" readonly>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>
<style scoped></style>